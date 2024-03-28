from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from core.views import IndexTemplateView
from django.views.generic import TemplateView
from django.views.static import serve
from django.contrib.auth import views as auth_views

urlpatterns = []

urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT
    }),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
     path('password_reset/', auth_views.PasswordResetView.as_view(template_name='registration/password_reset_form.html'), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
      path('password-reset/confirm/<str:uidb64>/<str:token>',
              TemplateView.as_view(template_name="password_reset_confirm.html"), name='password_reset_confirm'),
      path('admin/', admin.site.urls),
      path('accounts/', include('allauth.urls')),
      path('auth/', include('dj_rest_auth.urls')),
      path('auth/registration/', include('dj_rest_auth.registration.urls')),
      path('auth/', include('user.urls')),
      path('api/projects/', include('projects.urls')),
      path('charity/', include('charity.urls')),
      re_path(r"^.*$", IndexTemplateView.as_view(), name="entry-point"),
] 
