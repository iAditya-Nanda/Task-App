import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import '../../providers/task_provider.dart';
import '../../providers/auth_provider.dart';
import '../../core/constants/app_colors.dart';
import '../auth/login_screen.dart';
import 'widgets/task_card.dart';
import 'widgets/add_task_sheet.dart';

class DashboardScreen extends ConsumerStatefulWidget {
  const DashboardScreen({super.key});

  @override
  ConsumerState<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends ConsumerState<DashboardScreen> {
  final _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    Future.microtask(() => ref.read(taskProvider.notifier).fetchTasks());
  }

  void _showAddTaskSheet({String? id, String? initialTitle, String? initialDescription}) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => AddTaskSheet(
        taskId: id,
        initialTitle: initialTitle,
        initialDescription: initialDescription,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final taskState = ref.watch(taskProvider);
    
    // Listen for errors and show snackbar
    ref.listen<TaskListState>(taskProvider, (previous, next) {
      if (next.error != null && next.error != previous?.error) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(next.error!),
            backgroundColor: AppColors.rosePrimary,
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
        );
      }
    });

    final openTasks = taskState.tasks.where((t) => t.status == 'OPEN').toList();
    final completedTasks = taskState.tasks.where((t) => t.status == 'COMPLETED').toList();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () async => ref.read(taskProvider.notifier).fetchTasks(),
          color: AppColors.purplePrimary,
          child: CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              _buildAppBar(),
              _buildSummaryCards(openTasks.length, completedTasks.length),
              _buildSectionHeader('YOUR TASKS', openTasks.isNotEmpty),
              _buildTaskList(openTasks, 'No open tasks yet!'),
              _buildSectionHeader('COMPLETED', completedTasks.isNotEmpty),
              _buildTaskList(completedTasks, 'Complete some tasks to see them here.'),
              const SliverToBoxAdapter(child: SizedBox(height: 100)),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showAddTaskSheet(),
        backgroundColor: Colors.black,
        icon: const Icon(Icons.add_rounded, color: Colors.white),
        label: const Text('New Task', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ).animate().fadeIn(delay: 1000.ms).scale(),
    );
  }

  Widget _buildAppBar() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Welcome Home!',
                      style: Theme.of(context).textTheme.titleLarge,
                    ).animate().fadeIn().moveX(begin: -10, end: 0),
                    const SizedBox(height: 4),
                    Text(
                      'Let\'s be productive today.',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ).animate().fadeIn(delay: 200.ms),
                  ],
                ),
                IconButton(
                  onPressed: () {
                    ref.read(authProvider.notifier).logout();
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(builder: (_) => const LoginScreen()),
                    );
                  },
                  icon: const Icon(Icons.logout_rounded, color: AppColors.textMuted),
                ).animate().fadeIn(),
              ],
            ),
            const SizedBox(height: 24),
            TextField(
              controller: _searchController,
              onChanged: (val) => ref.read(taskProvider.notifier).fetchTasks(search: val),
              decoration: const InputDecoration(
                hintText: 'Search your tasks...',
                prefixIcon: Icon(Icons.search_rounded, color: AppColors.textMuted),
                contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                fillColor: Colors.white,
              ),
            ).animate().fadeIn(delay: 400.ms).moveY(begin: 10, end: 0),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryCards(int open, int completed) {
    return SliverToBoxAdapter(
      child: SizedBox(
        height: 160,
        child: ListView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 24),
          children: [
            _summaryCard(
              'Total Tasks',
              '${open + completed}',
              AppColors.purpleLight,
              AppColors.purplePrimary,
              Icons.dashboard_rounded,
            ).animate(delay: 600.ms).fadeIn().moveX(begin: 20, end: 0),
            const SizedBox(width: 16),
            _summaryCard(
              'Open',
              '$open',
              AppColors.blueLight,
              AppColors.bluePrimary,
              Icons.pending_actions_rounded,
            ).animate(delay: 700.ms).fadeIn().moveX(begin: 20, end: 0),
            const SizedBox(width: 16),
            _summaryCard(
              'Done',
              '$completed',
              AppColors.emeraldLight,
              AppColors.emeraldPrimary,
              Icons.check_circle_outline_rounded,
            ).animate(delay: 800.ms).fadeIn().moveX(begin: 20, end: 0),
          ],
        ),
      ),
    );
  }

  Widget _summaryCard(String title, String count, Color bg, Color iconColor, IconData icon) {
    return Container(
      width: 140,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: bg.withAlpha(128),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: bg, width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: iconColor, size: 28),
          const Spacer(),
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.textMuted)),
          Text(count, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 28, color: Colors.black)),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, bool show) {
    if (!show) return const SliverToBoxAdapter(child: SizedBox.shrink());
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(24, 32, 24, 16),
        child: Text(
          title,
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            letterSpacing: 1.5,
            color: AppColors.textSubtle,
          ),
        ),
      ),
    );
  }

  Widget _buildTaskList(List tasks, String emptyMsg) {
    if (tasks.isEmpty) {
      if (emptyMsg.isEmpty) return const SliverToBoxAdapter(child: SizedBox.shrink());
      return SliverToBoxAdapter(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(40.0),
            child: Text(emptyMsg, style: const TextStyle(color: AppColors.textSubtle)),
          ),
        ),
      );
    }

    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      sliver: SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final task = tasks[index];
            return AnimationConfiguration.staggeredList(
              position: index,
              duration: const Duration(milliseconds: 375),
              child: SlideAnimation(
                verticalOffset: 50.0,
                child: FadeInAnimation(
                  child: TaskCard(
                    task: task,
                    onToggle: () => ref.read(taskProvider.notifier).toggleTask(task.id),
                    onDelete: () => ref.read(taskProvider.notifier).deleteTask(task.id),
                    onEdit: () => _showAddTaskSheet(
                      id: task.id,
                      initialTitle: task.title,
                      initialDescription: task.description,
                    ),
                  ),
                ),
              ),
            );
          },
          childCount: tasks.length,
        ),
      ),
    );
  }
}
