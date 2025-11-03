import logoURL from "../assets/logo.svg";

declare global {
    interface Window {
        reactData: {
            nonce: string;
            settingsApiUrl: string;
            logoUrl: string;
            options: Record<string, any>;
            settings: any;
        };
    }
}

export default function pluginData() {
    const defaultSettings = {
        general: {
            name: "General Settings",
            sections: {
                section_app_config: {
                    id: "section_app_config",
                    name: "Application Configuration",
                    desc: "Configure the basic settings for your application.",
                    fields: [
                        {
                            id: "app_name",
                            title: "Application Name",
                            desc: "Enter the name of your application",
                            type: "text",
                            placeholder: "My Awesome App",
                            default: "My App"
                        },
                        {
                            id: "app_status",
                            title: "Enable Application",
                            label: "Turn on to activate the application features",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "max_users",
                            title: "Maximum Users",
                            desc: "Set the maximum number of concurrent users allowed",
                            type: "number",
                            placeholder: 100,
                            default: 50
                        },
                        {
                            id: "app_mode",
                            title: "Application Mode",
                            subTitle: "Select the mode in which the application should run",
                            type: "radio",
                            options: {
                                development: "Development",
                                staging: "Staging",
                                production: "Production"
                            },
                            default: "production"
                        }
                    ]
                },
                section_notification: {
                    id: "section_notification",
                    name: "Notification Settings",
                    desc: "Manage how and when notifications are sent to users.",
                    fields: [
                        {
                            id: "notification_method",
                            title: "Notification Method",
                            desc: "Choose how notifications should be delivered",
                            type: "select",
                            options: {
                                email: "Email",
                                sms: "SMS",
                                push: "Push Notification",
                                all: "All Methods"
                            },
                            placeholder: "Select method",
                            default: "email"
                        },
                        {
                            id: "notification_frequency",
                            title: "Notification Frequency",
                            label: "Send notifications in real-time",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "notification_emails",
                            title: "Additional Email Recipients",
                            desc: "Add email addresses to receive notifications",
                            type: "tags",
                            placeholder: "email@example.com"
                        },
                        {
                            id: "notification_channels",
                            title: "Notification Channels",
                            subTitle: "Select which channels should be enabled for notifications",
                            type: "checkbox",
                            options: {
                                email_alerts: "Email Alerts",
                                sms_alerts: "SMS Alerts",
                                push_alerts: "Push Notifications",
                                in_app: "In-App Notifications",
                                webhook: "Webhook Notifications"
                            },
                            default: ["email_alerts", "in_app"]
                        }
                    ]
                },
                section_security: {
                    id: "section_security",
                    name: "Security Settings",
                    desc: "Configure security and access control settings.",
                    fields: [
                        {
                            id: "api_key",
                            title: "API Key",
                            desc: "Your secure API key for authentication",
                            type: "password",
                            placeholder: "************"
                        },
                        {
                            id: "allowed_ips",
                            title: "Allowed IP Addresses",
                            desc: "Whitelist IP addresses that can access the API",
                            type: "tags",
                            placeholder: "192.168.1.1"
                        },
                        {
                            id: "session_timeout",
                            title: "Session Timeout (minutes)",
                            desc: "Time before user sessions expire",
                            type: "number",
                            placeholder: 30,
                            default: 15
                        },
                        {
                            id: "security_features",
                            title: "Security Features",
                            subTitle: "Enable additional security features for enhanced protection",
                            type: "checkbox",
                            options: {
                                two_factor: "Two-Factor Authentication",
                                ip_whitelist: "IP Whitelisting",
                                ssl_enforce: "Enforce SSL/TLS",
                                rate_limiting: "Rate Limiting",
                                audit_logging: "Audit Logging"
                            },
                            default: ["two_factor", "ssl_enforce"]
                        }
                    ]
                }
            }
        },
        users: {
            name: "User Management",
            sections: {
                section_user_roles: {
                    id: "section_user_roles",
                    name: "User Roles & Permissions",
                    desc: "Define which user roles have access to the system.",
                    fields: [
                        {
                            id: "enable_role_restrictions",
                            title: "Enable Role Restrictions",
                            label: "Restrict access based on user roles",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "allowed_roles",
                            title: "Allowed User Roles",
                            desc: "Select which user roles can access the system",
                            type: "select",
                            options: {
                                administrator: "Administrator",
                                editor: "Editor",
                                author: "Author",
                                contributor: "Contributor",
                                subscriber: "Subscriber",
                                customer: "Customer"
                            },
                            placeholder: "Select user roles",
                            multiple: true,
                            default: ["administrator", "editor"]
                        },
                        {
                            id: "default_permission_level",
                            title: "Default Permission Level",
                            subTitle: "Choose the default permission level for new users",
                            type: "radio",
                            options: {
                                read_only: "Read Only",
                                read_write: "Read & Write",
                                full_access: "Full Access"
                            },
                            default: "read_only"
                        }
                    ]
                },
                section_registration: {
                    id: "section_registration",
                    name: "User Registration",
                    desc: "Control how new users can register on your platform.",
                    fields: [
                        {
                            id: "allow_registration",
                            title: "Allow User Registration",
                            label: "Enable self-registration for new users",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "registration_message",
                            title: "Registration Welcome Message",
                            desc: "Message displayed to users after successful registration",
                            type: "text",
                            placeholder: "Welcome to our platform!",
                            default: "Thank you for registering!"
                        },
                        {
                            id: "blocked_email_domains",
                            title: "Blocked Email Domains",
                            desc: "Email domains that are not allowed to register",
                            type: "tags",
                            placeholder: "spam.com"
                        },
                        {
                            id: "default_role",
                            title: "Default User Role",
                            desc: "Role assigned to new users upon registration",
                            type: "select",
                            options: {
                                subscriber: "Subscriber",
                                customer: "Customer",
                                contributor: "Contributor"
                            },
                            placeholder: "Select default role",
                            default: "subscriber"
                        },
                        {
                            id: "registration_requirements",
                            title: "Registration Requirements",
                            subTitle: "Select which fields are required during registration",
                            type: "checkbox",
                            options: {
                                email_verification: "Email Verification",
                                phone_verification: "Phone Verification",
                                terms_acceptance: "Terms & Conditions Acceptance",
                                profile_photo: "Profile Photo",
                                bio: "Bio/Description"
                            },
                            default: ["email_verification", "terms_acceptance"]
                        }
                    ]
                },
                section_user_limits: {
                    id: "section_user_limits",
                    name: "User Activity Limits",
                    desc: "Set limits on user activities to prevent abuse.",
                    fields: [
                        {
                            id: "enable_activity_limits",
                            title: "Enable Activity Limits",
                            label: "Track and limit user activities",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "max_login_attempts",
                            title: "Maximum Login Attempts",
                            desc: "Number of failed login attempts before account lockout",
                            type: "number",
                            placeholder: 5,
                            default: 3
                        },
                        {
                            id: "lockout_duration",
                            title: "Lockout Duration (hours)",
                            desc: "How long accounts remain locked after exceeding login attempts",
                            type: "number",
                            placeholder: 24,
                            default: 1
                        }
                    ]
                }
            }
        },
        scheduling: {
            name: "Scheduling",
            sections: {
                section_maintenance: {
                    id: "section_maintenance",
                    name: "Maintenance Window",
                    desc: "Schedule regular maintenance windows for system updates.",
                    fields: [
                        {
                            id: "enable_maintenance_mode",
                            title: "Enable Maintenance Mode",
                            label: "Activate maintenance mode during scheduled windows",
                            type: "switch",
                            default: "no"
                        },
                        {
                            id: "maintenance_start",
                            title: "Maintenance Start Time",
                            desc: "Select the date and time when maintenance should begin",
                            type: "datetime",
                            settings: {
                                timePicker: false,
                            },
                            placeholder: "Select start date and time"
                        },
                        {
                            id: "maintenance_end",
                            title: "Maintenance End Time",
                            desc: "Select the date and time when maintenance should end",
                            type: "datetime",
                            settings: {
                                timePicker: true,
                            },
                            placeholder: "Select end date and time"
                        },
                        {
                            id: "maintenance_frequency",
                            title: "Maintenance Frequency",
                            subTitle: "How often should maintenance occur",
                            type: "radio",
                            options: {
                                weekly: "Weekly",
                                biweekly: "Bi-weekly",
                                monthly: "Monthly",
                                quarterly: "Quarterly"
                            },
                            default: "monthly"
                        }
                    ]
                },
                section_backup: {
                    id: "section_backup",
                    name: "Automated Backups",
                    desc: "Configure automated backup schedules for your data.",
                    fields: [
                        {
                            id: "enable_auto_backup",
                            title: "Enable Automated Backups",
                            label: "Automatically backup data on schedule",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "backup_time",
                            title: "Backup Time",
                            desc: "Select the time when daily backups should run",
                            type: "datetime",
                            placeholder: "Select backup time"
                        },
                        {
                            id: "backup_frequency",
                            title: "Backup Frequency",
                            subTitle: "How often should backups be created",
                            type: "radio",
                            options: {
                                hourly: "Hourly",
                                daily: "Daily",
                                weekly: "Weekly",
                                monthly: "Monthly"
                            },
                            default: "daily"
                        },
                        {
                            id: "backup_types",
                            title: "Backup Types",
                            subTitle: "Select what should be included in backups",
                            type: "checkbox",
                            options: {
                                database: "Database",
                                files: "Files & Media",
                                config: "Configuration Files",
                                logs: "System Logs",
                                user_data: "User Data"
                            },
                            default: ["database", "files", "config"]
                        },
                        {
                            id: "backup_retention",
                            title: "Backup Retention (days)",
                            desc: "Number of days to retain backups before deletion",
                            type: "number",
                            placeholder: 30,
                            default: 30
                        }
                    ]
                },
                section_reports: {
                    id: "section_reports",
                    name: "Scheduled Reports",
                    desc: "Configure automated report generation and delivery.",
                    fields: [
                        {
                            id: "enable_scheduled_reports",
                            title: "Enable Scheduled Reports",
                            label: "Automatically generate and send reports",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "report_generation_time",
                            title: "Report Generation Time",
                            desc: "When should reports be generated",
                            type: "datetime",
                            placeholder: "Select report time"
                        },
                        {
                            id: "report_types",
                            title: "Report Types",
                            subTitle: "Select which reports should be generated",
                            type: "checkbox",
                            options: {
                                usage_stats: "Usage Statistics",
                                user_activity: "User Activity",
                                security_audit: "Security Audit",
                                performance: "Performance Metrics",
                                financial: "Financial Summary"
                            },
                            default: ["usage_stats", "user_activity"]
                        },
                        {
                            id: "report_format",
                            title: "Report Format",
                            subTitle: "Choose the format for generated reports",
                            type: "radio",
                            options: {
                                pdf: "PDF",
                                csv: "CSV",
                                excel: "Excel (XLSX)",
                                json: "JSON"
                            },
                            default: "pdf"
                        },
                        {
                            id: "report_recipients",
                            title: "Report Recipients",
                            desc: "Email addresses to receive scheduled reports",
                            type: "tags",
                            placeholder: "admin@example.com"
                        }
                    ]
                }
            }
        }
    };

    if (window.reactData) {
        return {
            nonce: window.reactData.nonce,
            settingsApiUrl: window.reactData.settingsApiUrl,
            logoUrl: window.reactData.logoUrl && Object.keys(window.reactData.settings).length > 0
                ? window.reactData.logoUrl
                : logoURL,
            options: window.reactData.options,
            settings: window.reactData.settings && Object.keys(window.reactData.settings).length > 0
                ? window.reactData.settings
                : defaultSettings,
        };
    }

    return {
        nonce: '',
        settingsApiUrl: '',
        logoUrl: logoURL,
        options: {},
        settings: defaultSettings,
    };
}

