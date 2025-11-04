# Admin Settings Pages

Create a beautiful WordPress plugin settings page with React, Shadcn UI, and TypeScript, easily and quickly.

## Quick Start

### 1. Include the AdminSettings Class

```php
require_once PLUGIN_DIR . 'admin-settings/admin-settings.php';
```

### 2. Define Page Data

Configure the settings page appearance and menu structure:

```php
$page_data = array(
	'page_title' => 'My Settings Page',      // Page title in browser tab
	'menu_title' => 'My Settings',           // Menu item title
	'capability' => 'manage_options',         // User capability required
	'menu_slug'  => 'my-settings',           // Unique slug for the page
	'icon'       => 'dashicons-admin-generic', // WordPress dashicon class
	'position'   => 20,                      // Menu position (optional)
	'logo_url'   => PLUGIN_URL . 'assets/images/logo.svg', // Logo URL (optional)
	'is_main_menu' => true,                  // true for main menu, false for submenu (optional, defaults to true)
	'parent_slug' => '',                     // Required if is_main_menu is false
);
```

### 3. Define Settings Data Structure

Create your settings structure with tabs, sections, and fields:

```php
$settings_data = array(
	'tab_slug' => array(
		'name'     => 'Tab Name',
		'sections' => array(
			'section_slug' => array(
				'id'     => 'section_slug',
				'name'   => 'Section Name',
				'desc'   => 'Section description',
				'fields' => array(
					// Field definitions here
				),
			),
		),
	),
);
```

### 4. Initialize AdminSettings

```php
$admin_settings = new AdminSettings( $page_data, $settings_data, PLUGIN_URL, PLUGIN_VERSION );
```

## Supported Field Types

### 1. Text Field

A simple text input field for single-line text values.

```php
array(
	'id'          => 'app_name',
	'title'       => 'Application Name',
	'desc'        => 'Enter the name of your application',
	'type'        => 'text',
	'placeholder' => 'My Awesome App',
	'default'     => 'My App',
	'value'       => get_option( 'app_name' ),
),
```

**Properties:**
- `id` (required): Unique field identifier
- `title` (required): Field label
- `desc` (optional): Help text below the field
- `type`: Must be `'text'`
- `placeholder` (optional): Placeholder text
- `default` (optional): Default value
- `value` (optional): Current value (typically from `get_option()`)

---

### 2. Switch Field

A toggle switch for boolean values (yes/no).

```php
array(
	'id'      => 'app_status',
	'title'   => 'Enable Application',
	'label'   => 'Turn on to activate the application features',
	'type'    => 'switch',
	'default' => 'yes',
	'value'   => get_option( 'app_status' ),
),
```

**Properties:**
- `id` (required): Unique field identifier
- `title` (required): Field label
- `label` (optional): Additional description text
- `type`: Must be `'switch'`
- `default` (optional): Default value (`'yes'` or `'no'`)
- `value` (optional): Current value

---

### 3. Number Field

A number input field for numeric values.

```php
array(
	'id'          => 'max_users',
	'title'       => 'Maximum Users',
	'desc'        => 'Set the maximum number of concurrent users allowed',
	'type'        => 'number',
	'placeholder' => 100,
	'default'     => 50,
	'value'       => get_option( 'max_users' ),
),
```

**Properties:**
- `id` (required): Unique field identifier
- `title` (required): Field label
- `desc` (optional): Help text below the field
- `type`: Must be `'number'`
- `placeholder` (optional): Placeholder number
- `default` (optional): Default numeric value
- `value` (optional): Current value

---

### 4. Password Field

A password input field for sensitive data (values are masked).

```php
array(
	'id'          => 'api_key',
	'title'       => 'API Key',
	'desc'        => 'Your secure API key for authentication',
	'type'        => 'password',
	'placeholder' => '************',
	'value'       => get_option( 'api_key' ),
),
```

**Properties:**
- `id` (required): Unique field identifier
- `title` (required): Field label
- `desc` (optional): Help text below the field
- `type`: Must be `'password'`
- `placeholder` (optional): Placeholder text
- `value` (optional): Current value (masked when displayed)

---

### 5. Radio Field

A group of radio buttons for selecting one option from multiple choices.

```php
array(
	'id'       => 'app_mode',
	'title'    => 'Application Mode',
	'subTitle' => 'Select the mode in which the application should run',
	'type'     => 'radio',
	'options'  => array(
		'development' => 'Development',
		'staging'     => 'Staging',
		'production'  => 'Production',
	),
	'default'  => 'production',
	'value'    => get_option( 'app_mode' ),
),
```

**Properties:**
- `id` (required): Unique field identifier
- `title` (required): Field label
- `subTitle` (optional): Additional description text
- `type`: Must be `'radio'`
- `options` (required): Associative array of `value => label` pairs
- `default` (optional): Default selected value (must match a key in `options`)
- `value` (optional): Currently selected value

---

### 6. Select Field

A dropdown select field for single or multiple selections.

#### Single Select

```php
array(
	'id'          => 'notification_method',
	'title'       => 'Notification Method',
	'desc'        => 'Choose how notifications should be delivered',
	'type'        => 'select',
	'options'     => array(
		'email' => 'Email',
		'sms'   => 'SMS',
		'push'  => 'Push Notification',
		'all'   => 'All Methods',
	),
	'placeholder' => 'Select method',
	'default'     => 'email',
	'value'       => get_option( 'notification_method' ),
),
```

#### Multiple Select

```php
array(
	'id'          => 'allowed_roles',
	'title'       => 'Allowed User Roles',
	'desc'        => 'Select which user roles can access the system',
	'type'        => 'select',
	'options'     => array(
		'administrator' => 'Administrator',
		'editor'        => 'Editor',
		'author'        => 'Author',
		'contributor'   => 'Contributor',
		'subscriber'    => 'Subscriber',
		'customer'      => 'Customer',
	),
	'placeholder' => 'Select user roles',
	'multiple'    => true,  // Enable multiple selection
	'default'     => array( 'administrator', 'editor' ),
	'value'       => get_option( 'allowed_roles' ),
),
```

**Properties:**
- `id` (required): Unique field identifier
- `title` (required): Field label
- `desc` (optional): Help text below the field
- `type`: Must be `'select'`
- `options` (required): Associative array of `value => label` pairs
- `placeholder` (optional): Placeholder text
- `multiple` (optional): Set to `true` for multiple selection (default: `false`)
- `default` (optional): Default selected value(s) - string for single, array for multiple
- `value` (optional): Currently selected value(s)

---

### 7. Checkbox Field

A group of checkboxes for selecting multiple options simultaneously.

```php
array(
	'id'       => 'notification_channels',
	'title'    => 'Notification Channels',
	'subTitle' => 'Select which channels should be enabled for notifications',
	'type'     => 'checkbox',
	'options'  => array(
		'email_alerts' => 'Email Alerts',
		'sms_alerts'   => 'SMS Alerts',
		'push_alerts'  => 'Push Notifications',
		'in_app'       => 'In-App Notifications',
		'webhook'      => 'Webhook Notifications',
	),
	'default'  => array( 'email_alerts', 'in_app' ),
	'value'    => get_option( 'notification_channels' ),
),
```

**Properties:**
- `id` (required): Unique field identifier
- `title` (required): Field label
- `subTitle` (optional): Additional description text
- `type`: Must be `'checkbox'`
- `options` (required): Associative array of `value => label` pairs
- `default` (optional): Array of default selected option keys
- `value` (optional): Currently selected options (array)

---

### 8. Tags Field

An input field for managing multiple tag-like values (e.g., email addresses, IP addresses).

```php
array(
	'id'          => 'notification_emails',
	'title'       => 'Additional Email Recipients',
	'desc'        => 'Add email addresses to receive notifications',
	'type'        => 'tags',
	'placeholder' => 'email@example.com',
	'value'       => get_option( 'notification_emails' ),
),
```

**Properties:**
- `id` (required): Unique field identifier
- `title` (required): Field label
- `desc` (optional): Help text below the field
- `type`: Must be `'tags'`
- `placeholder` (optional): Placeholder text for new tags
- `value` (optional): Current tags (array or comma-separated string)

---

### 9. Datetime Field

A date and time picker for scheduling and time-based settings.

#### With Time Picker

```php
array(
	'id'          => 'maintenance_end',
	'title'       => 'Maintenance End Time',
	'desc'        => 'Select the date and time when maintenance should end',
	'type'        => 'datetime',
	'settings'    => array(
		'timePicker' => true,  // Enable time picker
	),
	'placeholder' => 'Select end date and time',
	'value'       => get_option( 'maintenance_end' ),
),
```

#### Without Time Picker (Date Only)

```php
array(
	'id'          => 'maintenance_start',
	'title'       => 'Maintenance Start Time',
	'desc'        => 'Select the date and time when maintenance should begin',
	'type'        => 'datetime',
	'settings'    => array(
		'timePicker' => false,  // Date only
	),
	'placeholder' => 'Select start date and time',
	'value'       => get_option( 'maintenance_start' ),
),
```

#### Simple Datetime (Defaults to with time picker)

```php
array(
	'id'          => 'backup_time',
	'title'       => 'Backup Time',
	'desc'        => 'Select the time when daily backups should run',
	'type'        => 'datetime',
	'placeholder' => 'Select backup time',
	'value'       => get_option( 'backup_time' ),
),
```

**Properties:**
- `id` (required): Unique field identifier
- `title` (required): Field label
- `desc` (optional): Help text below the field
- `type`: Must be `'datetime'`
- `settings` (optional): Configuration object
  - `timePicker` (optional): Boolean to enable/disable time picker (default: `true`)
- `placeholder` (optional): Placeholder text
- `value` (optional): Current date/time value (ISO format string)

---

## Field Validation

You can add custom validation for any field by creating a function named `admin_settings_validate_{field_id}`:

```php
function admin_settings_validate_app_name( $field, $all_options ) {
	$app_name = $all_options['app_name'] ?? '';
	
	// Example validation
	if ( empty( $app_name ) ) {
		return false;  // Validation failed
	}
	
	if ( strlen( $app_name ) < 3 ) {
		return false;  // Name too short
	}
	
	return true;  // Validation passed
}
```

**Parameters:**
- `$field`: The field configuration array
- `$all_options`: Array of all submitted option values

**Return:**
- `true`: Validation passed
- `false`: Validation failed (error message will be shown)

---

## Complete Example

Here's a complete example showing how to set up a settings page:

```php
<?php
defined( 'ABSPATH' ) || exit;

defined( 'PLUGIN_DIR' ) || define( 'PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
defined( 'PLUGIN_URL' ) || define( 'PLUGIN_URL', plugin_dir_url( __FILE__ ) );
defined( 'PLUGIN_VERSION' ) || define( 'PLUGIN_VERSION', '1.0.0' );

require_once PLUGIN_DIR . 'admin-settings/admin-settings.php';

// Optional: Add field validation
function admin_settings_validate_app_name( $field, $all_options ) {
	$app_name = $all_options['app_name'] ?? '';
	return ! empty( $app_name ) && strlen( $app_name ) >= 3;
}

// Page configuration
$page_data = array(
	'page_title' => 'My Plugin Settings',
	'menu_title' => 'My Plugin',
	'capability' => 'manage_options',
	'menu_slug'  => 'my-plugin-settings',
	'icon'       => 'dashicons-admin-generic',
	'position'   => 20,
	'logo_url'   => PLUGIN_URL . 'assets/images/logo.svg',
);

// Settings structure
$settings_data = array(
	'general' => array(
		'name'     => 'General Settings',
		'sections' => array(
			'basic_config' => array(
				'id'     => 'basic_config',
				'name'   => 'Basic Configuration',
				'desc'   => 'Configure the basic settings for your plugin.',
				'fields' => array(
					array(
						'id'          => 'app_name',
						'title'       => 'Application Name',
						'desc'        => 'Enter the name of your application',
						'type'        => 'text',
						'placeholder' => 'My Awesome App',
						'default'     => 'My App',
						'value'       => get_option( 'app_name' ),
					),
					array(
						'id'      => 'app_status',
						'title'   => 'Enable Application',
						'label'   => 'Turn on to activate the application features',
						'type'    => 'switch',
						'default' => 'yes',
						'value'   => get_option( 'app_status' ),
					),
				),
			),
		),
	),
);

// Initialize the settings page
$admin_settings = new AdminSettings( $page_data, $settings_data, PLUGIN_URL, PLUGIN_VERSION );
```

---

## Notes

- All field values are automatically saved to WordPress options using `update_option()` with the field `id` as the option name
- The settings page uses WordPress REST API for saving settings
- Only users with the specified `capability` can access the settings page
- The React frontend is built from `admin-settings/build/` directory
- Make sure to build the React application before using this class

---

## Field Type Summary

| Type | Description | Multiple Values | Example Use Case |
|------|-------------|----------------|------------------|
| `text` | Single-line text input | No | Application name, message |
| `switch` | Toggle on/off | No | Enable/disable features |
| `number` | Numeric input | No | Maximum users, timeouts |
| `password` | Masked password input | No | API keys, secrets |
| `radio` | Single choice from options | No | Mode selection, format choice |
| `select` | Dropdown selection | Yes (with `multiple`) | Method selection, role selection |
| `checkbox` | Multiple selections | Yes | Feature toggles, requirements |
| `tags` | Multiple tag-like values | Yes | Email lists, IP addresses |
| `datetime` | Date/time picker | No | Schedules, maintenance windows |
