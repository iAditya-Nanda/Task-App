import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../providers/auth_provider.dart';
import '../../core/constants/app_colors.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isPasswordVisible = false;

  Future<void> _handleRegister() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in all fields')),
      );
      return;
    }

    await ref.read(authProvider.notifier).register(email, password);
    
    final state = ref.read(authProvider);
    if (state.status == AuthStatus.unauthenticated && state.error == null) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            backgroundColor: AppColors.emeraldPrimary,
            content: Text('Registration successful! Please login.'),
          ),
        );
        Navigator.of(context).pop();
      }
    } else if (state.status == AuthStatus.error) {
       if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: AppColors.rosePrimary,
            content: Text(state.error ?? 'Registration failed'),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Colors.black),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Create\nAccount',
                style: Theme.of(context).textTheme.displayLarge,
              ).animate().fadeIn().moveX(begin: -20, end: 0),
              const SizedBox(height: 12),
              Text(
                'Join TaskFlow and start organizing your day.',
                style: Theme.of(context).textTheme.bodyMedium,
              ).animate().fadeIn(delay: 200.ms),
              const SizedBox(height: 48),
              
              TextField(
                controller: _emailController,
                decoration: const InputDecoration(
                  hintText: 'Email address',
                  prefixIcon: Icon(Icons.email_outlined),
                ),
              ).animate().fadeIn(delay: 400.ms).moveY(begin: 20, end: 0),
              
              const SizedBox(height: 20),
              
              TextField(
                controller: _passwordController,
                obscureText: !_isPasswordVisible,
                decoration: InputDecoration(
                  hintText: 'Password',
                  prefixIcon: const Icon(Icons.lock_outline),
                  suffixIcon: IconButton(
                    icon: Icon(_isPasswordVisible ? Icons.visibility_off : Icons.visibility),
                    onPressed: () => setState(() => _isPasswordVisible = !_isPasswordVisible),
                  ),
                ),
              ).animate().fadeIn(delay: 500.ms).moveY(begin: 20, end: 0),
              
              const SizedBox(height: 48),
              
              ElevatedButton(
                onPressed: authState.status == AuthStatus.loading ? null : _handleRegister,
                child: authState.status == AuthStatus.loading
                    ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 3))
                    : const Text('Sign Up'),
              ).animate().fadeIn(delay: 600.ms).scale(),
              
              const SizedBox(height: 24),
              
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Already have an account? "),
                  GestureDetector(
                    onTap: () => Navigator.of(context).pop(),
                    child: const Text(
                      'Sign In',
                      style: TextStyle(color: AppColors.purplePrimary, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ).animate().fadeIn(delay: 800.ms),
            ],
          ),
        ),
      ),
    );
  }
}
