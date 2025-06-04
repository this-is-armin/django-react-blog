from django.contrib import admin
from django.utils.translation import ngettext
from django.contrib import messages

from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'title', 'is_published', 'created_at', 'updated_at']
    list_filter = ['user', 'is_published', 'created_at']
    list_per_page = 20
    list_max_show_all = 200
    search_fields = ['title', 'descritpion']
    readonly_fields = ['created_at', 'updated_at']
    prepopulated_fields = {'slug': ['title']}
    ordering = ['-created_at']
    actions = ['publish', 'unpublish']

    """
    To publish selected posts.
    """
    def publish(self, request, queryset):
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


    """
    To unpublish selected posts.
    """
    def unpublish(self, request, queryset):
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
