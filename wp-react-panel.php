<?php
/**
 * WPReactPanel Main
 */

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'WPReactPanel' ) ) {
	final class WPReactPanel {

		private $page_data;

		private $settings_data;

		private $page_slug;

		private $plugin_url;

		private $plugin_version;

		private $version = '1.0.0';

		private $configs;

		public function __construct( $page_data = [], $settings_data = [], $plugin_url = '', $plugin_version = '' ) {

			$this->page_data      = $page_data;
			$this->settings_data  = $settings_data;
			$this->page_slug      = $page_data['menu_slug'] ?? '';
			$this->plugin_url     = $plugin_url;
			$this->plugin_version = $plugin_version;
			$this->configs        = $page_data['configs'] ?? [];

			if ( ! isset( $this->page_data['logo_url'] ) || empty( $this->page_data['logo_url'] ) ) {
				$this->page_data['logo_url'] = $this->plugin_url . 'wp-react-panel/app/assets/logo.svg';
				$this->plugin_version        = $this->version;
			}

			add_action( 'admin_menu', [ $this, 'add_admin_menu' ] );
			add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
			add_action( 'rest_api_init', [ $this, 'register_api_routes' ] );

			add_filter( 'admin_footer_text', '__return_false' );
			add_filter( 'update_footer', '__return_false', 999 );
		}

		public function handle_update_api( WP_REST_Request $request ) {

			$all_options_data = $request->get_json_params();
			$all_options      = array_keys( $all_options_data );

			foreach ( $this->settings_data as $setting_tab ) {

				$sections = $setting_tab['sections'] ?? [];

				foreach ( $sections as $section ) {

					$fields = $section['fields'] ?? [];

					foreach ( $fields as $field ) {

						$field_id = $field['id'] ?? '';

						if ( ! in_array( $field_id, $all_options ) ) {
							return new WP_REST_Response( array( 'success' => false, 'message' => "Field {$field_id} could not found!" ), 200 );
						}

						$validation_function = 'admin_settings_validate_' . $field_id;

						if ( function_exists( $validation_function ) ) {
							$validation_result = call_user_func_array( $validation_function, [ $field, $all_options ] );

							if ( ! $validation_result ) {
								return new WP_REST_Response( array( 'success' => false, 'message' => 'Validation failed for field: ' . $field_id ), 200 );
							}
						}

						update_option( $field_id, $all_options_data[ $field_id ] );
					}
				}
			}

			return new WP_REST_Response( array( 'success' => true, 'message' => 'Settings updated successfully.' ), 200 );
		}

		public function permissions_callback() {
			return current_user_can( 'manage_options' );
		}

		public function register_api_routes() {
			register_rest_route( 'wp-react-panel/v1', "/{$this->page_slug}/update", array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_update_api' ),
				'permission_callback' => array( $this, 'permissions_callback' ),
			) );
		}

		public function enqueue_scripts( $hook_suffix ) {

			if ( "toplevel_page_{$this->page_slug}" !== $hook_suffix ) {
				return;
			}

			wp_enqueue_style( "{$this->page_slug}-settings-app", $this->plugin_url . 'wp-react-panel/build/static/css/index.css', array(), $this->plugin_version, );

			$localize_data = array_merge( $this->page_data,
				array(
					'nonce'          => wp_create_nonce( 'wp_rest' ),
					'pluginVersion'  => $this->plugin_version,
					'settings'       => $this->settings_data,
					'configs'        => $this->configs,
					'settingsApiUrl' => get_rest_url( false, "wp-react-panel/v1/{$this->page_slug}/update" ),
				)
			);
			wp_enqueue_script( "{$this->page_slug}-settings-app", $this->plugin_url . 'wp-react-panel/build/static/js/index.js', array(), $this->plugin_version, true );
			wp_localize_script( "{$this->page_slug}-settings-app", 'reactData', $localize_data );

			add_filter( 'admin_body_class', array( $this, 'add_admin_body_class' ), 999 );
		}

		public function render_settings_page() {
			echo '<div id="wp-react-panel-root"></div>';
		}

		public function add_admin_menu() {

			$page_args    = $this->page_data ?? [];
			$is_main_menu = ! isset( $page_args['is_main_menu'] ) || (bool) $page_args['is_main_menu'];
			$page_title   = $page_args['page_title'] ?? '';
			$menu_title   = $page_args['menu_title'] ?? '';
			$capability   = $page_args['capability'] ?? '';
			$parent_slug  = $page_args['parent_slug'] ?? '';
			$icon         = $page_args['icon'] ?? '';
			$position     = $page_args['position'] ?? '';

			if ( $is_main_menu ) {
				add_menu_page( $page_title, $menu_title, $capability, $this->page_slug, array( $this, 'render_settings_page' ), $icon, $position );
			} else {
				add_submenu_page( $parent_slug, $page_title, $menu_title, $capability, $this->page_slug, array( $this, 'render_settings_page' ) );
			}
		}

		public function add_admin_body_class( $classes ) {

			$classes .= ' wp-react-panel';

			return $classes;
		}
	}
}