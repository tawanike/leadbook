from django.contrib import admin
from leadbook.companies.models import Company

class CompanyAdmin(admin.ModelAdmin):
    pass

admin.site.register(Company, CompanyAdmin)
