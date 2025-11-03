import logoURL from "../../assets/images/logo.svg";

declare global {
    interface Window {
        reactData: {
            nonce: string;
            restUrl: string;
            logoUrl: string;
            options: Record<string, any>;
            settings: any;
        };
    }
}

export default function pluginData() {
    const defaultSettings = {
        general: {
            name: "General",
            sections: {
                section_threshold: {
                    id: "section_threshold",
                    name: "Configure Risk Threshold",
                    desc: "All the orders will be marked based on this configuration.",
                    fields: [
                        {
                            id: "frauddefender_general_threshold_medium",
                            title: "Medium Threshold Value",
                            desc:
                                "Orders below this value will be marked as low risk orders and above from this value until high threshold value will be marked as medium risk.",
                            type: "number",
                            placeholder: 25
                        },
                        {
                            id: "frauddefender_general_threshold_high",
                            title: "Medium Threshold High",
                            desc: "Orders above this value will be marked as high risk.",
                            type: "number",
                            placeholder: 75
                        }
                    ]
                },
                section_origins: {
                    id: "section_origins",
                    name: "Configure Order Origin",
                    desc: "Control order origins and block specific order origin.",
                    fields: [
                        {
                            id: "frauddefender_block_unknown_or_empty_origins",
                            title: "Unknown/Empty Origins",
                            label:
                                'Any order with order origin "Unknown" or no order origin will be blocked.',
                            type: "switch"
                        },
                        {
                            id: "frauddefender_general_origins_blocked",
                            title: "Block Order Origins",
                            desc: "You can add any specific order origins here and any orders with these origin will be blocked automatically.",
                            type: "tags",
                        }
                    ]
                },
                section_order_status: {
                    id: "section_order_status",
                    name: "Configure Order Status",
                    desc: "Control order status and block specific status.",
                    fields: [
                        {
                            id: "frauddefender_enable_order_status_control",
                            title: "Control Order Status",
                            label:
                                "Update order status based on the AI and calculated fraud score.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_order_status_cancel_calculated_score",
                            title: "Order Cancel Score",
                            desc: "Set the calculated score for order cancellation starts",
                            type: "select",
                            options: {
                                "00": "00",
                                "5": "05",
                                "10": "10",
                                "15": "15",
                                "20": "20",
                                "25": "25",
                                "30": "30",
                                "35": "35",
                                "40": "40",
                                "45": "45",
                                "50": "50",
                                "55": "55",
                                "60": "60",
                                "65": "65",
                                "70": "70",
                                "75": "75",
                                "80": "80",
                                "85": "85",
                                "90": "90",
                                "95": "95",
                                "100": "100"
                            },
                            placeholder: "Calculated score"
                        }
                    ]
                },
                section_api_order: {
                    id: "section_api_order",
                    name: "Control API Orders",
                    desc:
                        "Check and block orders coming through the API. Note: This only works with api endpoint https://site.com/wp-json/wc/v3/orders/",
                    fields: [
                        {
                            id: "frauddefender_enable_stop_getting_api_orders",
                            title: "Block API Orders",
                            label:
                                "Stop getting orders from the WooCommerce REST API. No score will be calculated, Fraud Defender will just cancelled all the API orders.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_enable_api_order_throttle",
                            title: "Throttle API Orders",
                            label: "Manage API based orders by throttling on hourly basis.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_api_orders_per_hour",
                            title: "API Orders Per Hour",
                            desc:
                                "Limit the number of orders coming through API per hour.",
                            type: "number",
                            placeholder: 20
                        }
                    ]
                },
                section_order_blocking: {
                    id: "section_order_blocking",
                    name: "Block All Orders",
                    desc:
                        "Temporarily block all orders from being placed on your store. This will show an error message to customers when they try to place an order.",
                    fields: [
                        {
                            id: "frauddefender_enable_block_all_orders",
                            title: "Block All Orders",
                            label:
                                "Enable this to block all orders from being placed. Customers will see an error message when trying to checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_block_orders_message",
                            title: "Block Message",
                            desc:
                                "The error message that will be shown to customers when they try to place an order.",
                            type: "text",
                            placeholder: "We are not taking orders right now!",
                            default: "We are not taking orders right now!"
                        }
                    ]
                }
            }
        },
        velocity: {
            name: "Velocity Attack",
            sections: {
                section_order_attempts: {
                    id: "section_order_attempts",
                    name: "Order Attempts",
                    desc:
                        "Block multiple order attempts orders from the same customers at a certain time.",
                    fields: [
                        {
                            id: "frauddefender_enable_order_attempts_per_user",
                            title: "Order Attempts per User",
                            label:
                                "Limit the number of orders that can allow from the same customer.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_order_attempts_time_span_per_user",
                            title: "",
                            desc: "Time span to check in hours per user basis.",
                            type: "number",
                            placeholder: 24
                        },
                        {
                            id: "frauddefender_order_attempts_number_per_user",
                            title: "",
                            desc:
                                "Maximum allowed number of orders per user in the above time span.",
                            type: "number",
                            placeholder: 5
                        },
                        {
                            id: "frauddefender_enable_order_attempts_per_ip",
                            title: "Order Attempts per IP",
                            label:
                                "Limit the number of orders that can allow from the same customer.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_order_attempts_time_span_per_ip",
                            title: "",
                            desc: "Time span to check in hours per IP basis.",
                            type: "number",
                            placeholder: 24
                        },
                        {
                            id: "frauddefender_order_attempts_number_per_ip",
                            title: "",
                            desc:
                                "Maximum allowed number of orders per IP in the above time span.",
                            type: "number",
                            placeholder: 5
                        }
                    ]
                },

                section_payment_attempts: {
                    id: "section_payment_attempts",
                    name: "Payment Attempts",
                    desc: "Block multiple payment attempts for the same order.",
                    fields: [
                        {
                            id: "frauddefender_enable_payment_attempts_check",
                            title: "Payment Attempts Check",
                            label:
                                "Limit the number of payment attempt that can allow for an order.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_payment_attempts_count",
                            title: "Maximum Payment Attempts",
                            desc: "Specified the maximum payment attempts for an order",
                            type: "number",
                            placeholder: 3
                        },
                        {
                            id: "frauddefender_payment_attempts_order_status",
                            title: "Order Status Change",
                            desc:
                                "If the maximum payment attempts reached, change the order status.",
                            type: "select",
                            options: {
                                no_change: "Do not change status",
                                "wc-pending": "Pending payment",
                                "wc-processing": "Processing",
                                "wc-on-hold": "On hold",
                                "wc-completed": "Completed",
                                "wc-cancelled": "Cancelled",
                                "wc-refunded": "Refunded",
                                "wc-failed": "Failed",
                                "wc-checkout-draft": "Draft"
                            },
                            placeholder: "Set order status"
                        }
                    ]
                }
            }
        },
        ai_blocker: {
            name: "AI Blocker",
            sections: {
                section_ai_chatgpt: {
                    id: "section_ai_chatgpt",
                    name: "ChatGPT Blocker",
                    desc: "Block fraud orders even after checkout using AI.",
                    fields: [
                        {
                            id: "frauddefender_enable_chatgpt_ai_blocker",
                            title: "Enable ChatGPT AI Blocker",
                            label:
                                "Turn on AI blocker to detect fraud orders using artificial intelligence.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_chatgpt_version",
                            title: "ChatGPT Version",
                            type: "select",
                            options: {
                                "gpt-3.5-turbo": "GPT 3.5 Turbo",
                                "gpt-4.1": "GPT 4.1",
                                "gpt-4.1-mini": "GPT 4.1 Mini",
                                "gpt-4.1-nano": "GPT 4.1 Nano",
                                "gpt-4o": "GPT 4o",
                                "gpt-4o-mini": "GPT 4o Mini",
                                "o4-mini": "GPT o4 Mini"
                            },
                            placeholder: "Select version"
                        },
                        {
                            id: "frauddefender_chatgpt_api_key",
                            title: "ChatGPT API Key",
                            type: "text",
                            desc: "Enter ChatGPT API key."
                        }
                    ]
                }
            }
        },
        score_rules: {
            name: "Score Rules",
            sections: {
                section_rules_general: {
                    id: "section_rules_general",
                    name: "General Rules",
                    desc:
                        "Every rule has a weight which will be used to calculate the fraud score. If you disable any rule, this will not be counted in the calculation process. Higher the weight value means the high risk.",
                    fields: [
                        {
                            id: "frauddefender_rule_first_time_purchase_status",
                            title: "First Time Purchase",
                            label:
                                "This will calculate for the orders placed from an user purchasing first time in your store.",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_first_time_purchase_weight",
                            title: "",
                            desc: "Weight for the first time purchase rule.",
                            type: "number",
                            placeholder: 5,
                            default: 5
                        },
                        {
                            id: "frauddefender_rule_address_status",
                            title: "Same Billing & Shipping",
                            label:
                                "Check if the billing address and shipping address same for the order",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_address_weight",
                            title: "",
                            desc:
                                "Weight for the billing and shipping address check rule.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_location_matched_status",
                            title: "Billing Address",
                            label:
                                "Check if the billing address matched with the customer's GEO location based on city or country.",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_location_matched_weight",
                            title: "",
                            desc:
                                "Weight for the location matched with the billing address check rule.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_number_format_validation_status",
                            title: "Phone Number Validation",
                            label:
                                "Check if the phone number format is matched with the format of customer's country.",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_number_format_validation_weight",
                            title: "",
                            desc:
                                "Weight for the phone number validation the phone number format of customer's country.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_proxy_status",
                            title: "Proxy or VPN",
                            label: "Check if the customer is using any proxy network or VPN.",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_proxy_weight",
                            title: "",
                            desc:
                                "Weight for the customer's network, if using any VPN or proxy.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_multiple_orders_status",
                            title: "Multiple Orders",
                            label:
                                "Customer is trying to order using different addresses from the same IP.",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_multiple_orders_weight",
                            title: "",
                            desc: "Weight for the multiple orders rule.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_multiple_orders_days",
                            title: "",
                            desc:
                                "Number of days to check for the the previous orders.",
                            type: "number",
                            placeholder: 20,
                            default: 20
                        },
                        {
                            id: "frauddefender_rule_international_order_status",
                            title: "International Order",
                            label:
                                "Customer is trying to order from the a different country comparing with the store's default country.",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_international_order_weight",
                            title: "",
                            desc: "Weight for the international order rule.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_high_risk_country_status",
                            title: "High Risk Country",
                            label:
                                "Customer is from a country that is highly possible to be fraudulent. You can update high risk country below.",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_high_risk_country_weight",
                            title: "",
                            desc: "Weight for the high risk country rule.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_high_risk_country_list",
                            title: "",
                            desc:
                                "Manage high risk from this country list. You can uncheck the default countries as per your convenient.",
                            type: "select",
                            options: {
                                "AF": "Afghanistan",
                                "AX": "Åland Islands",
                                "AL": "Albania",
                                "DZ": "Algeria",
                                "AS": "American Samoa",
                                "AD": "Andorra",
                                "AO": "Angola",
                                "AI": "Anguilla",
                                "AQ": "Antarctica",
                                "AG": "Antigua and Barbuda",
                                "AR": "Argentina",
                                "AM": "Armenia",
                                "AW": "Aruba",
                                "AU": "Australia",
                                "AT": "Austria",
                                "AZ": "Azerbaijan",
                                "BS": "Bahamas",
                                "BH": "Bahrain",
                                "BD": "Bangladesh",
                                "BB": "Barbados",
                                "BY": "Belarus",
                                "PW": "Belau",
                                "BE": "Belgium",
                                "BZ": "Belize",
                                "BJ": "Benin",
                                "BM": "Bermuda",
                                "BT": "Bhutan",
                                "BO": "Bolivia",
                                "BQ": "Bonaire, Saint Eustatius and Saba",
                                "BA": "Bosnia and Herzegovina",
                                "BW": "Botswana",
                                "BV": "Bouvet Island",
                                "BR": "Brazil",
                                "IO": "British Indian Ocean Territory",
                                "BN": "Brunei",
                                "BG": "Bulgaria",
                                "BF": "Burkina Faso",
                                "BI": "Burundi",
                                "KH": "Cambodia",
                                "CM": "Cameroon",
                                "CA": "Canada",
                                "CV": "Cape Verde",
                                "KY": "Cayman Islands",
                                "CF": "Central African Republic",
                                "TD": "Chad",
                                "CL": "Chile",
                                "CN": "China",
                                "CX": "Christmas Island",
                                "CC": "Cocos (Keeling) Islands",
                                "CO": "Colombia",
                                "KM": "Comoros",
                                "CG": "Congo (Brazzaville)",
                                "CD": "Congo (Kinshasa)",
                                "CK": "Cook Islands",
                                "CR": "Costa Rica",
                                "HR": "Croatia",
                                "CU": "Cuba",
                                "CW": "Curaçao",
                                "CY": "Cyprus",
                                "CZ": "Czech Republic",
                                "DK": "Denmark",
                                "DJ": "Djibouti",
                                "DM": "Dominica",
                                "DO": "Dominican Republic",
                                "EC": "Ecuador",
                                "EG": "Egypt",
                                "SV": "El Salvador",
                                "GQ": "Equatorial Guinea",
                                "ER": "Eritrea",
                                "EE": "Estonia",
                                "SZ": "Eswatini",
                                "ET": "Ethiopia",
                                "FK": "Falkland Islands",
                                "FO": "Faroe Islands",
                                "FJ": "Fiji",
                                "FI": "Finland",
                                "FR": "France",
                                "GF": "French Guiana",
                                "PF": "French Polynesia",
                                "TF": "French Southern Territories",
                                "GA": "Gabon",
                                "GM": "Gambia",
                                "GE": "Georgia",
                                "DE": "Germany",
                                "GH": "Ghana",
                                "GI": "Gibraltar",
                                "GR": "Greece",
                                "GL": "Greenland",
                                "GD": "Grenada",
                                "GP": "Guadeloupe",
                                "GU": "Guam",
                                "GT": "Guatemala",
                                "GG": "Guernsey",
                                "GN": "Guinea",
                                "GW": "Guinea-Bissau",
                                "GY": "Guyana",
                                "HT": "Haiti",
                                "HM": "Heard Island and McDonald Islands",
                                "HN": "Honduras",
                                "HK": "Hong Kong",
                                "HU": "Hungary",
                                "IS": "Iceland",
                                "IN": "India",
                                "ID": "Indonesia",
                                "IR": "Iran",
                                "IQ": "Iraq",
                                "IE": "Ireland",
                                "IM": "Isle of Man",
                                "IL": "Israel",
                                "IT": "Italy",
                                "CI": "Ivory Coast",
                                "JM": "Jamaica",
                                "JP": "Japan",
                                "JE": "Jersey",
                                "JO": "Jordan",
                                "KZ": "Kazakhstan",
                                "KE": "Kenya",
                                "KI": "Kiribati",
                                "XK": "Kosovo",
                                "KW": "Kuwait",
                                "KG": "Kyrgyzstan",
                                "LA": "Laos",
                                "LV": "Latvia",
                                "LB": "Lebanon",
                                "LS": "Lesotho",
                                "LR": "Liberia",
                                "LY": "Libya",
                                "LI": "Liechtenstein",
                                "LT": "Lithuania",
                                "LU": "Luxembourg",
                                "MO": "Macao",
                                "MG": "Madagascar",
                                "MW": "Malawi",
                                "MY": "Malaysia",
                                "MV": "Maldives",
                                "ML": "Mali",
                                "MT": "Malta",
                                "MH": "Marshall Islands",
                                "MQ": "Martinique",
                                "MR": "Mauritania",
                                "MU": "Mauritius",
                                "YT": "Mayotte",
                                "MX": "Mexico",
                                "FM": "Micronesia",
                                "MD": "Moldova",
                                "MC": "Monaco",
                                "MN": "Mongolia",
                                "ME": "Montenegro",
                                "MS": "Montserrat",
                                "MA": "Morocco",
                                "MZ": "Mozambique",
                                "MM": "Myanmar",
                                "NA": "Namibia",
                                "NR": "Nauru",
                                "NP": "Nepal",
                                "NL": "Netherlands",
                                "NC": "New Caledonia",
                                "NZ": "New Zealand",
                                "NI": "Nicaragua",
                                "NE": "Niger",
                                "NG": "Nigeria",
                                "NU": "Niue",
                                "NF": "Norfolk Island",
                                "KP": "North Korea",
                                "MK": "North Macedonia",
                                "MP": "Northern Mariana Islands",
                                "NO": "Norway",
                                "OM": "Oman",
                                "PK": "Pakistan",
                                "PS": "Palestinian Territory",
                                "PA": "Panama",
                                "PG": "Papua New Guinea",
                                "PY": "Paraguay",
                                "PE": "Peru",
                                "PH": "Philippines",
                                "PN": "Pitcairn",
                                "PL": "Poland",
                                "PT": "Portugal",
                                "PR": "Puerto Rico",
                                "QA": "Qatar",
                                "RE": "Reunion",
                                "RO": "Romania",
                                "RU": "Russia",
                                "RW": "Rwanda",
                                "ST": "São Tomé and Príncipe",
                                "BL": "Saint Barthélemy",
                                "SH": "Saint Helena",
                                "KN": "Saint Kitts and Nevis",
                                "LC": "Saint Lucia",
                                "SX": "Saint Martin (Dutch part)",
                                "MF": "Saint Martin (French part)",
                                "PM": "Saint Pierre and Miquelon",
                                "VC": "Saint Vincent and the Grenadines",
                                "WS": "Samoa",
                                "SM": "San Marino",
                                "SA": "Saudi Arabia",
                                "SN": "Senegal",
                                "RS": "Serbia",
                                "SC": "Seychelles",
                                "SL": "Sierra Leone",
                                "SG": "Singapore",
                                "SK": "Slovakia",
                                "SI": "Slovenia",
                                "SB": "Solomon Islands",
                                "SO": "Somalia",
                                "ZA": "South Africa",
                                "GS": "South Georgia/Sandwich Islands",
                                "KR": "South Korea",
                                "SS": "South Sudan",
                                "ES": "Spain",
                                "LK": "Sri Lanka",
                                "SD": "Sudan",
                                "SR": "Suriname",
                                "SJ": "Svalbard and Jan Mayen",
                                "SE": "Sweden",
                                "CH": "Switzerland",
                                "SY": "Syria",
                                "TW": "Taiwan",
                                "TJ": "Tajikistan",
                                "TZ": "Tanzania",
                                "TH": "Thailand",
                                "TL": "Timor-Leste",
                                "TG": "Togo",
                                "TK": "Tokelau",
                                "TO": "Tonga",
                                "TT": "Trinidad and Tobago",
                                "TN": "Tunisia",
                                "TR": "Türkiye",
                                "TM": "Turkmenistan",
                                "TC": "Turks and Caicos Islands",
                                "TV": "Tuvalu",
                                "UG": "Uganda",
                                "UA": "Ukraine",
                                "AE": "United Arab Emirates",
                                "GB": "United Kingdom (UK)",
                                "US": "United States (US)",
                                "UM": "United States (US) Minor Outlying Islands",
                                "UY": "Uruguay",
                                "UZ": "Uzbekistan",
                                "VU": "Vanuatu",
                                "VA": "Vatican",
                                "VE": "Venezuela",
                                "VN": "Vietnam",
                                "VG": "Virgin Islands (British)",
                                "VI": "Virgin Islands (US)",
                                "WF": "Wallis and Futuna",
                                "EH": "Western Sahara",
                                "YE": "Yemen",
                                "ZM": "Zambia",
                                "ZW": "Zimbabwe"
                            },
                            multiple: true,
                            placeholder: "Select unsafe countries"
                        },
                        {
                            id: "frauddefender_rule_high_risk_email_status",
                            title: "High Risk Email",
                            label:
                                "Customer is using an email that is highly possible to be fraudulent. You can update high risk email domain below.",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_high_risk_email_weight",
                            title: "",
                            desc: "Weight for the high risk email rule.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_high_risk_email_domains",
                            title: "",
                            type: "tags",
                            desc:
                                "Enter all the possible high risk email providers domain name. i;e: yopmail.com [complete part after @]"
                        },
                        {
                            id: "frauddefender_rule_above_avg_order_value_status",
                            title: "Average Order Value",
                            label:
                                "The order amount is above average value for your store which can be a parameter to be fraudulent.",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_above_avg_order_value_weight",
                            title: "",
                            desc: "Weight for the average order value rule.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_above_avg_order_value_multiplier",
                            title: "",
                            desc:
                                "Set the multiplier to trigger this rule when an order exceeds the average transaction value. For example, entering 2 will trigger the rule for orders that are twice the average order value or higher.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_above_avg_order_value_months",
                            title: "",
                            desc:
                                "Set the number of months to be calculated for the retrieving the average order value.",
                            type: "number",
                            placeholder: 6,
                            default: 6
                        },
                        {
                            id: "frauddefender_rule_above_store_limit_status",
                            title: "Above Store Limit",
                            label:
                                "The order amount is above the configured store limit.",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "frauddefender_rule_above_store_limit_weight",
                            title: "",
                            desc: "Weight for the above store limit rule.",
                            type: "number",
                            placeholder: 10,
                            default: 10
                        },
                        {
                            id: "frauddefender_rule_above_store_limit_value",
                            title: "",
                            desc:
                                "Set the store limit value for a single order. Default is no limit.",
                            type: "number",
                            placeholder: 1000
                        }
                    ]
                }
            }
        },
        whitelist: {
            name: "Whitelist",
            sections: {
                section_whitelist_emails: {
                    id: "section_whitelist_emails",
                    name: "Email Whitelist",
                    desc: "List of Emails whitelisted.",
                    fields: [
                        {
                            id: "frauddefender_enable_whitelist_emails",
                            title: "Enable Email Whitelisting",
                            label: "Turn on email whitelisting for checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_whitelist_emails",
                            title: "Whitelisted Emails",
                            type: "tags",
                            desc:
                                "Enter all the whitelisted emails here to bypass all checks."
                        }
                    ]
                },

                section_whitelist_ips: {
                    id: "section_whitelist_ips",
                    name: "IP Addresses Whitelist",
                    desc: "List of IP Addresses whitelisted.",
                    fields: [
                        {
                            id: "frauddefender_enable_whitelist_ips",
                            title: "Enable IP Whitelisting",
                            label: "Turn on IP whitelisting for checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_whitelist_ips",
                            title: "Whitelisted IP Addresses",
                            type: "tags",
                            desc:
                                "Enter all the whitelisted ips here to bypass all checks."
                        }
                    ]
                },

                section_whitelist_phone: {
                    id: "section_whitelist_phone",
                    name: "Phone Number Whitelist",
                    desc: "List of Phone Number whitelisted.",
                    fields: [
                        {
                            id: "frauddefender_enable_whitelist_phone",
                            title: "Enable Phone Number Whitelisting",
                            label: "Turn on phone number whitelisting for checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_whitelist_phone",
                            title: "Whitelisted Phone Numbers",
                            type: "tags",
                            desc:
                                "Enter all the whitelisted phone numbers here to bypass all checks."
                        }
                    ]
                },

                section_whitelist_roles: {
                    id: "section_whitelist_roles",
                    name: "User Roles Whitelist",
                    desc: "List of user roles whitelisted.",
                    fields: [
                        {
                            id: "frauddefender_enable_whitelist_roles",
                            title: "Enable User Roles Whitelisting",
                            label: "Turn on user roles whitelisting for checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_whitelist_roles",
                            title: "Whitelisted User Roles",
                            type: "select",
                            options: {
                                administrator: "Administrator",
                                editor: "Editor",
                                author: "Author",
                                contributor: "Contributor",
                                subscriber: "Subscriber",
                                customer: "Customer",
                                shop_manager: "Shop manager"
                            },
                            placeholder: "Select user roles",
                            multiple: true,
                            desc:
                                "Enter all the whitelisted user roles here to bypass all checks."
                        }
                    ]
                },

                section_whitelist_payment: {
                    id: "section_whitelist_payment",
                    name: "Payment Methods Whitelist",
                    desc: "List of payment methods whitelisted.",
                    fields: [
                        {
                            id: "frauddefender_enable_whitelist_payments",
                            title: "Enable Payment Methods Whitelisting",
                            label: "Turn on payment method whitelisting for checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_whitelist_payments",
                            title: "Whitelisted User Roles",
                            type: "select",
                            options: {
                                bacs: "Direct bank transfer",
                                cheque: "Check payments",
                                cod: "Cash on delivery",
                                ppcp: "PayPal",
                                ppcp_card: "Credit/Debit Cards"
                            },
                            placeholder: "Select payment method",
                            multiple: true,
                            desc:
                                "Enter all the whitelisted payment methods here to bypass all checks."
                        }
                    ]
                }
            }
        },
        blacklist: {
            name: "Blacklist",
            sections: {
                section_blacklist_emails: {
                    id: "section_blacklist_emails",
                    name: "Email Blacklist",
                    desc: "List of Emails blacklisted.",
                    fields: [
                        {
                            id: "frauddefender_enable_blacklist_emails",
                            title: "Enable Email Blacklisting",
                            label: "Turn on email blacklisting for checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_blacklist_emails",
                            title: "Blacklisted Emails",
                            type: "tags",
                            desc:
                                "Enter all the blacklisted emails here to bypass all checks."
                        }
                    ]
                },

                section_blacklist_ips: {
                    id: "section_blacklist_ips",
                    name: "IP Addresses Blacklist",
                    desc: "List of IP Addresses blacklisted.",
                    fields: [
                        {
                            id: "frauddefender_enable_blacklist_ips",
                            title: "Enable IP Blacklisting",
                            label: "Turn on IP blacklisting for checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_blacklist_ips",
                            title: "Blacklisted IP Addresses",
                            type: "tags",
                            desc:
                                "Enter all the blacklisted ips here to bypass all checks."
                        }
                    ]
                },

                section_blacklist_phone: {
                    id: "section_blacklist_phone",
                    name: "Phone Number Blacklist",
                    desc: "List of Phone Number blacklisted.",
                    fields: [
                        {
                            id: "frauddefender_enable_blacklist_phone",
                            title: "Enable Phone Number Blacklisting",
                            label: "Turn on phone number blacklisting for checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_blacklist_phone",
                            title: "Blacklisted Phone Numbers",
                            type: "tags",
                            desc:
                                "Enter all the blacklisted phone numbers here to bypass all checks."
                        }
                    ]
                },

                section_blacklist_roles: {
                    id: "section_blacklist_roles",
                    name: "User Roles Blacklist",
                    desc: "List of user roles blacklisted.",
                    fields: [
                        {
                            id: "frauddefender_enable_blacklist_roles",
                            title: "User Role Blacklisting",
                            label: "Turn on user roles blacklisting for checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_blacklist_roles",
                            title: "Blacklisted User Roles",
                            type: "select",
                            options: {
                                administrator: "Administrator",
                                editor: "Editor",
                                author: "Author",
                                contributor: "Contributor",
                                subscriber: "Subscriber",
                                customer: "Customer",
                                shop_manager: "Shop manager"
                            },
                            placeholder: "Select user roles",
                            multiple: true,
                            desc:
                                "Enter all the blacklisted user roles here to bypass all checks."
                        }
                    ]
                },

                section_blacklist_payment: {
                    id: "section_blacklist_payment",
                    name: "Payment Methods Blacklist",
                    desc: "List of payment methods blacklisted.",
                    fields: [
                        {
                            id: "frauddefender_enable_blacklist_payments",
                            title: "Payment Method Blacklisting",
                            label: "Turn on payment method blacklisting for checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_blacklist_payments",
                            title: "Blacklisted Payment Methods",
                            type: "select",
                            options: {
                                bacs: "Direct bank transfer",
                                cheque: "Check payments",
                                cod: "Cash on delivery",
                                ppcp: "PayPal",
                                ppcp_card: "Credit/Debit Cards"
                            },
                            placeholder: "Select payment method",
                            multiple: true,
                            desc:
                                "Enter all the blacklisted payment methods here to bypass all checks."
                        }
                    ]
                }
            }
        },
        verification: {
            name: "Verification",
            sections: {
                section_sms_verification: {
                    id: "section_sms_verification",
                    name: "SMS Verification",
                    desc:
                        "Enabling this verification method will add an extra step to the checkout process of verifying their phone number with an OTP.",
                    fields: [
                        {
                            id: "frauddefender_enable_sms_verification",
                            title: "Enable SMS Verification",
                            label: "Turn on SMS verification method before the checkout.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_fraud_labs_api_key",
                            title: "Fraud Labs API Key",
                            type: "password",
                            placeholder: "************",
                            desc:
                                "Add the Fraud Labs Pro API key here to verify phone number from their website. Get your API key"
                        }
                    ]
                },

                section_email_verification: {
                    id: "section_email_verification",
                    name: "Email Verification",
                    desc:
                        "Enabling this verification method will work for the guest checkout only.",
                    fields: [
                        {
                            id: "frauddefender_enable_email_verification",
                            title: "Enable Email Verification",
                            label: "Turn on Email verification method during the checkout.",
                            type: "switch"
                        }
                    ]
                }
            }
        },
        captcha: {
            name: "Captcha",
            sections: {
                section_captcha_google: {
                    id: "section_captcha_google",
                    name: "Google reCaptcha",
                    desc:
                        "Activating reCaptcha will help you in reducing spam orders, particularly from velocity attacks. Click here to register for Google reCaptcha. We are using reCaptcha V2 to provide maximum protection.",
                    fields: [
                        {
                            id: "frauddefender_enable_recaptcha",
                            title: "Enable reCaptcha",
                            label: "Turn on Google reCaptcha in the checkout page.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_recaptcha_site_key",
                            title: "V2 Site Key",
                            type: "password",
                            desc: "Enter Google reCAPTCHA v2 Site Key."
                        },
                        {
                            id: "frauddefender_recaptcha_secret_key",
                            title: "V2 Secret Key",
                            type: "password",
                            desc: "Enter Google reCAPTCHA v2 Secret Key"
                        }
                    ]
                },

                section_captcha_turnstile: {
                    id: "section_captcha_turnstile",
                    name: "CloudFlare Turnstile",
                    desc:
                        "Activating turnstile will help you in reducing spam orders, particularly from velocity attacks. Click here to register for credentials.",
                    fields: [
                        {
                            id: "frauddefender_enable_turnstile",
                            title: "Enable CloudFlare Turnstile",
                            label: "Turn on CloudFlare turnstile in the checkout page.",
                            type: "switch"
                        },
                        {
                            id: "frauddefender_turnstile_site_key",
                            title: "Turnstile Site Key",
                            type: "password",
                            desc: "Enter Cloudflare turnstile site key."
                        },
                        {
                            id: "frauddefender_turnstile_secret_key",
                            title: "Turnstile Secret Key",
                            type: "password",
                            desc: "Enter Cloudflare turnstile secret key."
                        }
                    ]
                }
            }
        },
    };

    if (window.reactData) {
        return {
            nonce: window.reactData.nonce,
            restUrl: window.reactData.restUrl,
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
        restUrl: '',
        logoUrl: logoURL,
        options: {},
        settings: defaultSettings,
    };
}

