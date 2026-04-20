import { useRouter } from 'expo-router';
import { Eye, EyeOff, Footprints, Lock, Mail, User } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const colors = {
    n800: '#1F2937',
    n600: '#4B5563',
    n400: '#9CA3AF',
    n200: '#E5E7EB',
    n100: '#F3F4F6',
    g700: '#047857',
    g600: '#059669',
    g500: '#10B981',
    g200: '#A7F3D0',
    g100: '#D1FAE5',
    g50: '#ECFDF5',
    red: '#EF4444',
    white: '#FFFFFF',
};

function InputField({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize, rightElement, error }: any) {
    const [focused, setFocused] = useState(false);
    const anim = useRef(new Animated.Value(0)).current;

    function handleFocus() {
        setFocused(true);
        Animated.timing(anim, { toValue: 1, duration: 180, useNativeDriver: false }).start();
    }
    function handleBlur() {
        setFocused(false);
        Animated.timing(anim, { toValue: 0, duration: 180, useNativeDriver: false }).start();
    }

    const borderColor = error
        ? colors.red
        : anim.interpolate({ inputRange: [0, 1], outputRange: [colors.n200, colors.g500] });

    return (
        <View style={{ gap: 4 }}>
            <Animated.View style={{
                flexDirection: 'row', alignItems: 'center',
                borderWidth: 1.5, borderColor,
                borderRadius: 16,
                backgroundColor: error ? '#fef2f2' : focused ? colors.g50 : colors.n100,
                paddingHorizontal: 14, paddingVertical: 14, gap: 10,
            }}>
                <View style={{ opacity: focused ? 1 : 0.5 }}>{icon}</View>
                <TextInput
                    style={{ flex: 1, fontSize: 15, fontWeight: '600', color: colors.n800 }}
                    placeholder={placeholder}
                    placeholderTextColor={colors.n400}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType || 'default'}
                    autoCapitalize={autoCapitalize || 'none'}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {rightElement}
            </Animated.View>
            {error ? (
                <Text style={{ fontSize: 12, fontWeight: '600', color: colors.red, paddingLeft: 4 }}>{error}</Text>
            ) : null}
        </View>
    );
}

// Password strength indicator
function PasswordStrength({ password }: { password: string }) {
    const checks = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
    ];
    const score = checks.filter(Boolean).length;
    const label = score === 0 ? '' : score === 1 ? 'Weak' : score === 2 ? 'Fair' : 'Strong';
    const barColor = score === 1 ? colors.red : score === 2 ? '#F59E0B' : colors.g500;

    if (!password) return null;

    return (
        <View style={{ gap: 4, paddingHorizontal: 2 }}>
            <View style={{ flexDirection: 'row', gap: 4 }}>
                {[0, 1, 2].map((i) => (
                    <View key={i} style={{
                        flex: 1, height: 3, borderRadius: 2,
                        backgroundColor: i < score ? barColor : colors.n200,
                    }} />
                ))}
            </View>
            {label ? (
                <Text style={{ fontSize: 11, fontWeight: '700', color: barColor }}>{label} password</Text>
            ) : null}
        </View>
    );
}

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const buttonScale = useRef(new Animated.Value(1)).current;

    function handlePressIn() {
        Animated.spring(buttonScale, { toValue: 0.97, useNativeDriver: true }).start();
    }
    function handlePressOut() {
        Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();
    }

    function validate() {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = 'Name is required';
        if (!email.includes('@')) e.email = 'Enter a valid email';
        if (password.length < 8) e.password = 'At least 8 characters';
        if (password !== confirm) e.confirm = 'Passwords do not match';
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleRegister() {
        if (!validate()) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1400);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                    {/* Top accent bar */}
                    <View style={{ height: 5, backgroundColor: colors.g500, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, marginHorizontal: 44 }} />

                    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 36, paddingBottom: 32 }}>

                        {/* Back + Logo */}
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 28 }}
                            activeOpacity={0.7}
                        >
                            <Text style={{ fontSize: 22, color: colors.n400 }}>←</Text>
                            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.n400 }}>Back to login</Text>
                        </TouchableOpacity>

                        <View style={{ alignItems: 'center', marginBottom: 32 }}>
                            <View style={{
                                width: 64, height: 64, borderRadius: 20,
                                backgroundColor: colors.g500, alignItems: 'center', justifyContent: 'center',
                                marginBottom: 16,
                                shadowColor: colors.g500, shadowOpacity: 0.3,
                                shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 7,
                            }}>
                                <Footprints size={30} color="white" strokeWidth={2} />
                            </View>
                            <Text style={{ fontSize: 28, fontWeight: '800', color: colors.n800, letterSpacing: -0.5, marginBottom: 6 }}>
                                Create account
                            </Text>
                            <Text style={{ fontSize: 14, color: colors.n400, fontWeight: '500' }}>
                                Start walking and earning today
                            </Text>
                        </View>

                        {/* Perks row */}
                        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 28 }}>
                            {[
                                { icon: '👟', label: 'Free shoe' },
                                { icon: '🪙', label: 'Earn CELO' },
                                { icon: '🏆', label: 'Rank up' },
                            ].map((p) => (
                                <View key={p.label} style={{
                                    flex: 1, backgroundColor: colors.g50,
                                    borderWidth: 1.5, borderColor: colors.g200,
                                    borderRadius: 12, paddingVertical: 10,
                                    alignItems: 'center', gap: 4,
                                }}>
                                    <Text style={{ fontSize: 20 }}>{p.icon}</Text>
                                    <Text style={{ fontSize: 11, fontWeight: '700', color: colors.g700 }}>{p.label}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Form */}
                        <View style={{ gap: 12 }}>
                            <InputField
                                icon={<User size={18} color={colors.g500} strokeWidth={2} />}
                                placeholder="Full name"
                                value={name}
                                onChangeText={(v: string) => { setName(v); setErrors(e => ({ ...e, name: '' })); }}
                                autoCapitalize="words"
                                error={errors.name}
                            />
                            <InputField
                                icon={<Mail size={18} color={colors.g500} strokeWidth={2} />}
                                placeholder="Email address"
                                value={email}
                                onChangeText={(v: string) => { setEmail(v); setErrors(e => ({ ...e, email: '' })); }}
                                keyboardType="email-address"
                                error={errors.email}
                            />
                            <View style={{ gap: 6 }}>
                                <InputField
                                    icon={<Lock size={18} color={colors.g500} strokeWidth={2} />}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={(v: string) => { setPassword(v); setErrors(e => ({ ...e, password: '' })); }}
                                    secureTextEntry={!showPassword}
                                    error={errors.password}
                                    rightElement={
                                        <TouchableOpacity onPress={() => setShowPassword(v => !v)} activeOpacity={0.7}>
                                            {showPassword
                                                ? <EyeOff size={18} color={colors.n400} strokeWidth={2} />
                                                : <Eye size={18} color={colors.n400} strokeWidth={2} />}
                                        </TouchableOpacity>
                                    }
                                />
                                <PasswordStrength password={password} />
                            </View>
                            <InputField
                                icon={<Lock size={18} color={colors.g500} strokeWidth={2} />}
                                placeholder="Confirm password"
                                value={confirm}
                                onChangeText={(v: string) => { setConfirm(v); setErrors(e => ({ ...e, confirm: '' })); }}
                                secureTextEntry={!showConfirm}
                                error={errors.confirm}
                                rightElement={
                                    <TouchableOpacity onPress={() => setShowConfirm(v => !v)} activeOpacity={0.7}>
                                        {showConfirm
                                            ? <EyeOff size={18} color={colors.n400} strokeWidth={2} />
                                            : <Eye size={18} color={colors.n400} strokeWidth={2} />}
                                    </TouchableOpacity>
                                }
                            />
                        </View>

                        {/* Terms */}
                        <Text style={{ fontSize: 12, color: colors.n400, fontWeight: '500', textAlign: 'center', marginTop: 16, lineHeight: 18 }}>
                            By signing up you agree to our{' '}
                            <Text style={{ color: colors.g600, fontWeight: '700' }}>Terms of Service</Text>
                            {' '}and{' '}
                            <Text style={{ color: colors.g600, fontWeight: '700' }}>Privacy Policy</Text>
                        </Text>

                        {/* Register button */}
                        <Animated.View style={{ transform: [{ scale: buttonScale }], marginTop: 20 }}>
                            <Pressable
                                onPressIn={handlePressIn}
                                onPressOut={handlePressOut}
                                onPress={handleRegister}
                                disabled={loading}
                                style={{
                                    backgroundColor: loading ? colors.g200 : colors.g500,
                                    borderRadius: 18, paddingVertical: 17,
                                    alignItems: 'center',
                                    shadowColor: colors.g500, shadowOpacity: loading ? 0 : 0.3,
                                    shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 6,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: '800', color: 'white', letterSpacing: 0.2 }}>
                                    {loading ? 'Creating account…' : 'Create Account'}
                                </Text>
                            </Pressable>
                        </Animated.View>

                        {/* Login link */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24, gap: 4 }}>
                            <Text style={{ fontSize: 14, color: colors.n400, fontWeight: '500' }}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                                <Text style={{ fontSize: 14, fontWeight: '800', color: colors.g600 }}>Sign In</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}