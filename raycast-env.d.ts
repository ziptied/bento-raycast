/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Site UUID - Your Bento site UUID */
  "siteUuid": string,
  /** Publishable Key - Your Bento Publishable Key */
  "username": string,
  /** Secret Key - Your Bento Secret Key */
  "password": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `create-subscriber` command */
  export type CreateSubscriber = ExtensionPreferences & {}
  /** Preferences accessible in the `view-broadcasts` command */
  export type ViewBroadcasts = ExtensionPreferences & {}
  /** Preferences accessible in the `view-tags` command */
  export type ViewTags = ExtensionPreferences & {}
  /** Preferences accessible in the `view-fields` command */
  export type ViewFields = ExtensionPreferences & {}
  /** Preferences accessible in the `view-stats` command */
  export type ViewStats = ExtensionPreferences & {}
  /** Preferences accessible in the `view-report` command */
  export type ViewReport = ExtensionPreferences & {}
  /** Preferences accessible in the `configure-dashboard` command */
  export type ConfigureDashboard = ExtensionPreferences & {}
  /** Preferences accessible in the `view-dashboard` command */
  export type ViewDashboard = ExtensionPreferences & {}
  /** Preferences accessible in the `check-blacklist` command */
  export type CheckBlacklist = ExtensionPreferences & {}
  /** Preferences accessible in the `validate-email` command */
  export type ValidateEmail = ExtensionPreferences & {}
  /** Preferences accessible in the `moderate-content` command */
  export type ModerateContent = ExtensionPreferences & {}
  /** Preferences accessible in the `guess-gender` command */
  export type GuessGender = ExtensionPreferences & {}
  /** Preferences accessible in the `geolocate-ip` command */
  export type GeolocateIp = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `create-subscriber` command */
  export type CreateSubscriber = {}
  /** Arguments passed to the `view-broadcasts` command */
  export type ViewBroadcasts = {}
  /** Arguments passed to the `view-tags` command */
  export type ViewTags = {}
  /** Arguments passed to the `view-fields` command */
  export type ViewFields = {}
  /** Arguments passed to the `view-stats` command */
  export type ViewStats = {}
  /** Arguments passed to the `view-report` command */
  export type ViewReport = {}
  /** Arguments passed to the `configure-dashboard` command */
  export type ConfigureDashboard = {}
  /** Arguments passed to the `view-dashboard` command */
  export type ViewDashboard = {}
  /** Arguments passed to the `check-blacklist` command */
  export type CheckBlacklist = {}
  /** Arguments passed to the `validate-email` command */
  export type ValidateEmail = {}
  /** Arguments passed to the `moderate-content` command */
  export type ModerateContent = {}
  /** Arguments passed to the `guess-gender` command */
  export type GuessGender = {}
  /** Arguments passed to the `geolocate-ip` command */
  export type GeolocateIp = {}
}



