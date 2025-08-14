from django.contrib import admin
from django.utils.translation import ngettext
from django.contrib import messages

from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'title', 'is_published', 'created_at', 'updated_at']
    list_filter = ['user', 'is_published', 'created_at']
    list_per_page = 20
    list_max_show_all = 60
    search_fields = ['title', 'descritpion']
    readonly_fields = ['created_at', 'updated_at']
    prepopulated_fields = {'slug': ['title']}
    actions = ['publish', 'unpublish']

    def get_actions(self, request):
        actions = super().get_actions(request)

        if not Post.objects.filter(is_published=False).exists():
            if 'publish' in actions:
                del actions['publish']
        
        if not Post.objects.filter(is_published=True).exists():
            if 'unpublish' in actions:
                del actions['unpublish']
        
        return actions

    def publish(self, request, queryset):
        """
        To publish selected posts.
        """
        queryset = queryset.filter(is_published=False)
        updated = queryset.update(is_published=True)
        self.message_user(
            request,
            ngettext(
                f"Successfully published {updated} post.",
                f"Successfully published {updated} posts.",
                updated
            ),
            messages.SUCCESS
        )
    publish.short_description = "Publish selected posts"

    def unpublish(self, request, queryset):
        """
        To unpublish selected posts.
        """
        queryset = queryset.filter(is_published=True)
        updated = queryset.update(is_published=False)
        self.message_user(
            request,
            ngettext(
                f"Successfully unpublished {updated} post.",
                f"Successfully unpublished {updated} posts.",
                updated
            ),
            messages.SUCCESS
        )
    unpublish.short_description = "Unpublish selected posts"
