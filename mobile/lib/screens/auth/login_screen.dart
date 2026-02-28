import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../providers/auth_provider.dart';
import '../../core/constants/app_colors.dart';
import 'register_screen.dart';
import '../dashboard/dashboard_screen.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isPasswordVisible = false;

  Future<void> _handleLogin() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in all fields')),
      );
      return;
    }

    await ref.read(authProvider.notifier).login(email, password);
    
    final state = ref.read(authProvider);
    if (state.status == AuthStatus.authenticated) {
      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => const DashboardScreen()),
        );
      }
    } else if (state.status == AuthStatus.error) {
       if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: AppColors.rosePrimary,
            content: Text(state.error ?? 'Login failed'),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);

    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height,
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 80),
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: Colors.black,
                  borderRadius: BorderRadius.circular(18),
                ),
                child: Center(
                  child: SvgPicture.asset(
                    'assets/logo.svg',
                    colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                    width: 30,
                    height: 30,
                  ),
                ),
              ).animate().fadeIn().scale(),
              const SizedBox(height: 32),
              Text(
                'Welcome\nBack!',
                style: Theme.of(context).textTheme.displayLarge,
              ).animate().fadeIn(delay: 200.ms).moveX(begin: -20, end: 0),
              const SizedBox(height: 12),
              Text(
                'Sign in to continue managing your workspace.',
                style: Theme.of(context).textTheme.bodyMedium,
              ).animate().fadeIn(delay: 400.ms),
              const SizedBox(height: 48),
              
              TextField(
                controller: _emailController,
                decoration: const InputDecoration(
                  hintText: 'Email address',
                  prefixIcon: Icon(Icons.email_outlined),
                ),
              ).animate().fadeIn(delay: 600.ms).moveY(begin: 20, end: 0),
              
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
              ).animate().fadeIn(delay: 700.ms).moveY(begin: 20, end: 0),
              
              const SizedBox(height: 12),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () {},
                  child: const Text('Forgot Password?', style: TextStyle(color: AppColors.purplePrimary, fontWeight: FontWeight.bold)),
                ),
              ),
              
              const Spacer(),
              
              ElevatedButton(
                onPressed: authState.status == AuthStatus.loading ? null : _handleLogin,
                child: authState.status == AuthStatus.loading
                    ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 3))
                    : const Text('Sign In'),
              ).animate().fadeIn(delay: 800.ms).scale(),
              
              const SizedBox(height: 24),
              
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Don't have an account? "),
                  GestureDetector(
                    onTap: () {
                      Navigator.of(context).push(MaterialPageRoute(builder: (_) => const RegisterScreen()));
                    },
                    child: const Text(
                      'Sign Up',
                      style: TextStyle(color: AppColors.purplePrimary, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ).animate().fadeIn(delay: 1000.ms),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
