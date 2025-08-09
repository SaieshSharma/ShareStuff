import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import * as React from 'react'
import { Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput } from 'react-native'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState<string>('')
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [pendingVerification, setPendingVerification] = React.useState<boolean>(false)
  const [code, setCode] = React.useState<string>('')

  // Validate password strength
  const isPasswordStrong = (password: string): boolean => {
    // At least 8 characters, contains uppercase, lowercase, number, and special character
    const minLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    return minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
  }

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Validate inputs
    if (!emailAddress) {
      Alert.alert('Error', 'Please enter an email address')
      return
    }

    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username')
      return
    }

    if (username.length < 3) {
      Alert.alert('Error', 'Username must be at least 3 characters long')
      return
    }

    if (!password) {
      Alert.alert('Error', 'Please enter a password')
      return
    }

    if (!isPasswordStrong(password)) {
      Alert.alert(
        'Weak Password', 
        'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.'
      )
      return
    }

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err: any) {
      // Handle specific Clerk errors
      if (err.clerkError && err.errors) {
        const errorMessage = err.errors.map((error: any) => error.longMessage || error.message).join('\n')
        Alert.alert('Sign Up Error', errorMessage)
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.')
      }
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        
        // Now update the user profile with username after successful verification
        try {
          await signUpAttempt.createdUserId && await signUp.update({
            username: username.toLowerCase().replace(/\s+/g, ''), // Clean username
          })
        } catch (updateErr: any) {
          console.log('Username update failed, but user was created:', updateErr)
          // Don't block the user from proceeding even if username update fails
        }
        
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        Alert.alert('Verification Incomplete', 'Please check your email and try again.')
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err: any) {
      // Handle specific Clerk errors
      if (err.clerkError && err.errors) {
        const errorMessage = err.errors.map((error: any) => error.longMessage || error.message).join('\n')
        Alert.alert('Verification Error', errorMessage)
      } else {
        Alert.alert('Error', 'Invalid verification code. Please try again.')
      }
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.title}>Verify Your Email</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#aaa"
          onChangeText={setCode}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </KeyboardAvoidingView>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#aaa"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={username}
        placeholder="Enter username"
        placeholderTextColor="#aaa"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter strong password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Text style={styles.passwordHint}>
        Password must contain: 8+ characters, uppercase, lowercase, number, special character
      </Text>
      <Button title="Continue" onPress={onSignUpPress} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "white",
  },
  passwordHint: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
});