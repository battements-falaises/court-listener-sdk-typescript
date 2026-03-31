// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'retrieve',
    endpoint: '/courts/{id}/',
    httpMethod: 'get',
    summary: 'Retrieve a single court',
    description: 'Retrieve a single court',
    stainlessPath: '(resource) courts > (method) retrieve',
    qualified: 'client.courts.retrieve',
    params: ['id: string;', 'fields?: string;', "format?: 'json' | 'xml' | 'html';", 'omit?: string;'],
    response:
      '{ id?: string; citation_string?: string; date_created?: string; date_modified?: string; end_date?: string; full_name?: string; in_use?: boolean; jurisdiction?: string; position?: number; resource_uri?: string; short_name?: string; start_date?: string; url?: string; }',
    markdown:
      "## retrieve\n\n`client.courts.retrieve(id: string, fields?: string, format?: 'json' | 'xml' | 'html', omit?: string): { id?: string; citation_string?: string; date_created?: string; date_modified?: string; end_date?: string; full_name?: string; in_use?: boolean; jurisdiction?: string; position?: number; resource_uri?: string; short_name?: string; start_date?: string; url?: string; }`\n\n**get** `/courts/{id}/`\n\nRetrieve a single court\n\n### Parameters\n\n- `id: string`\n\n- `fields?: string`\n  Comma-separated list of fields to include. Supports nested fields via\ndouble-underscore notation (e.g. `educations__id`).\n\n\n- `format?: 'json' | 'xml' | 'html'`\n  Response serialization format. JSON is default when no `Accept` header\nis provided.\n\n- `omit?: string`\n  Comma-separated list of fields to exclude. Supports nested fields via\ndouble-underscore notation.\n\n\n### Returns\n\n- `{ id?: string; citation_string?: string; date_created?: string; date_modified?: string; end_date?: string; full_name?: string; in_use?: boolean; jurisdiction?: string; position?: number; resource_uri?: string; short_name?: string; start_date?: string; url?: string; }`\n\n  - `id?: string`\n  - `citation_string?: string`\n  - `date_created?: string`\n  - `date_modified?: string`\n  - `end_date?: string`\n  - `full_name?: string`\n  - `in_use?: boolean`\n  - `jurisdiction?: string`\n  - `position?: number`\n  - `resource_uri?: string`\n  - `short_name?: string`\n  - `start_date?: string`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport CourtListener from 'court-listener-sdk';\n\nconst client = new CourtListener();\n\nconst court = await client.courts.retrieve('id');\n\nconsole.log(court);\n```",
  },
  {
    name: 'list',
    endpoint: '/courts/',
    httpMethod: 'get',
    summary: 'List courts',
    description:
      'Returns a paginated list of courts. Results can generally be cached as\ncourt data changes infrequently.\n',
    stainlessPath: '(resource) courts > (method) list',
    qualified: 'client.courts.list',
    params: [
      'id?: string;',
      "count?: 'on';",
      'cursor?: string;',
      'date_modified?: string;',
      'date_modified__gte?: string;',
      'date_modified__lte?: string;',
      'fields?: string;',
      "format?: 'json' | 'xml' | 'html';",
      'full_name?: string;',
      'full_name__startswith?: string;',
      'id__in?: string;',
      'jurisdiction?: string;',
      'omit?: string;',
      'order_by?: string;',
      'page?: number;',
    ],
    response:
      '{ id?: string; citation_string?: string; date_created?: string; date_modified?: string; end_date?: string; full_name?: string; in_use?: boolean; jurisdiction?: string; position?: number; resource_uri?: string; short_name?: string; start_date?: string; url?: string; }',
    markdown:
      "## list\n\n`client.courts.list(id?: string, count?: 'on', cursor?: string, date_modified?: string, date_modified__gte?: string, date_modified__lte?: string, fields?: string, format?: 'json' | 'xml' | 'html', full_name?: string, full_name__startswith?: string, id__in?: string, jurisdiction?: string, omit?: string, order_by?: string, page?: number): { id?: string; citation_string?: string; date_created?: string; date_modified?: string; end_date?: string; full_name?: string; in_use?: boolean; jurisdiction?: string; position?: number; resource_uri?: string; short_name?: string; start_date?: string; url?: string; }`\n\n**get** `/courts/`\n\nReturns a paginated list of courts. Results can generally be cached as\ncourt data changes infrequently.\n\n\n### Parameters\n\n- `id?: string`\n  Filter by court identifier (e.g. `scotus`, `ca9`, `dcd`).\n\n- `count?: 'on'`\n  Set to `on` to return only the total count of matching items without\nresult data. When enabled, pagination parameters are ignored.\n\n- `cursor?: string`\n  Cursor token for deep pagination. Returned in the `next` / `previous`\nfields of paginated responses. Available when ordering by `id`,\n`date_modified`, or `date_created`.\n\n\n- `date_modified?: string`\n  Filter by exact date modified (ISO-8601).\n\n- `date_modified__gte?: string`\n  Filter courts modified on or after this date.\n\n- `date_modified__lte?: string`\n  Filter courts modified on or before this date.\n\n- `fields?: string`\n  Comma-separated list of fields to include. Supports nested fields via\ndouble-underscore notation (e.g. `educations__id`).\n\n\n- `format?: 'json' | 'xml' | 'html'`\n  Response serialization format. JSON is default when no `Accept` header\nis provided.\n\n- `full_name?: string`\n  Filter by the full name of the court.\n\n- `full_name__startswith?: string`\n  Filter courts whose full name starts with the given value.\n\n- `id__in?: string`\n  Filter by multiple court identifiers (comma-separated).\n\n- `jurisdiction?: string`\n  Filter by jurisdiction type. Common values:\n`F` (Federal Appellate), `FD` (Federal District),\n`FB` (Federal Bankruptcy), `FBP` (Federal Bankruptcy Panel),\n`FS` (Federal Special), `S` (State Supreme),\n`SA` (State Appellate), `ST` (State Trial),\n`SS` (State Special), `SAG` (State Attorney General),\n`T` (Tribal), `I` (International), `C` (Committee),\n`TES` (Testing).\n\n\n- `omit?: string`\n  Comma-separated list of fields to exclude. Supports nested fields via\ndouble-underscore notation.\n\n\n- `order_by?: string`\n  Comma-separated list of fields to order by. Prefix with `-` for\ndescending order. Use a secondary field as a tie-breaker for\ndeterministic ordering (e.g. `date_filed,id`).\n\n\n- `page?: number`\n  Page number for standard pagination (limited to 100 pages).\n\n### Returns\n\n- `{ id?: string; citation_string?: string; date_created?: string; date_modified?: string; end_date?: string; full_name?: string; in_use?: boolean; jurisdiction?: string; position?: number; resource_uri?: string; short_name?: string; start_date?: string; url?: string; }`\n\n  - `id?: string`\n  - `citation_string?: string`\n  - `date_created?: string`\n  - `date_modified?: string`\n  - `end_date?: string`\n  - `full_name?: string`\n  - `in_use?: boolean`\n  - `jurisdiction?: string`\n  - `position?: number`\n  - `resource_uri?: string`\n  - `short_name?: string`\n  - `start_date?: string`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport CourtListener from 'court-listener-sdk';\n\nconst client = new CourtListener();\n\n// Automatically fetches more pages as needed.\nfor await (const court of client.courts.list()) {\n  console.log(court);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/dockets/{id}/',
    httpMethod: 'get',
    summary: 'Retrieve a single docket',
    description: 'Retrieve a single docket',
    stainlessPath: '(resource) dockets > (method) retrieve',
    qualified: 'client.dockets.retrieve',
    params: ['id: number;', 'fields?: string;', "format?: 'json' | 'xml' | 'html';", 'omit?: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.dockets.retrieve(id: number, fields?: string, format?: 'json' | 'xml' | 'html', omit?: string): { id?: number; absolute_url?: string; appeal_from?: string; appeal_from_str?: string; appellate_case_type_information?: string; appellate_fee_status?: string; assigned_to?: string; assigned_to_str?: string; audio_files?: string[]; bankruptcy_information?: object; blocked?: boolean; case_name?: string; case_name_full?: string; case_name_short?: string; cause?: string; clusters?: string[]; court?: string; court_id?: string; date_argued?: string; date_blocked?: string; date_cert_denied?: string; date_cert_granted?: string; date_created?: string; date_filed?: string; date_last_filing?: string; date_last_index?: string; date_modified?: string; date_reargued?: string; date_reargument_denied?: string; date_terminated?: string; docket_number?: string; docket_number_core?: string; filepath_ia?: string; filepath_ia_json?: string; ia_date_first_change?: string; ia_needs_upload?: boolean; ia_upload_failure_count?: number; idb_data?: object; jurisdiction_type?: string; jury_demand?: string; mdl_status?: string; nature_of_suit?: string; original_court_info?: object; pacer_case_id?: string; panel?: string[]; panel_str?: string; referred_to?: string; referred_to_str?: string; resource_uri?: string; slug?: string; source?: number; tags?: string[]; }`\n\n**get** `/dockets/{id}/`\n\nRetrieve a single docket\n\n### Parameters\n\n- `id: number`\n\n- `fields?: string`\n  Comma-separated list of fields to include. Supports nested fields via\ndouble-underscore notation (e.g. `educations__id`).\n\n\n- `format?: 'json' | 'xml' | 'html'`\n  Response serialization format. JSON is default when no `Accept` header\nis provided.\n\n- `omit?: string`\n  Comma-separated list of fields to exclude. Supports nested fields via\ndouble-underscore notation.\n\n\n### Returns\n\n- `{ id?: number; absolute_url?: string; appeal_from?: string; appeal_from_str?: string; appellate_case_type_information?: string; appellate_fee_status?: string; assigned_to?: string; assigned_to_str?: string; audio_files?: string[]; bankruptcy_information?: object; blocked?: boolean; case_name?: string; case_name_full?: string; case_name_short?: string; cause?: string; clusters?: string[]; court?: string; court_id?: string; date_argued?: string; date_blocked?: string; date_cert_denied?: string; date_cert_granted?: string; date_created?: string; date_filed?: string; date_last_filing?: string; date_last_index?: string; date_modified?: string; date_reargued?: string; date_reargument_denied?: string; date_terminated?: string; docket_number?: string; docket_number_core?: string; filepath_ia?: string; filepath_ia_json?: string; ia_date_first_change?: string; ia_needs_upload?: boolean; ia_upload_failure_count?: number; idb_data?: object; jurisdiction_type?: string; jury_demand?: string; mdl_status?: string; nature_of_suit?: string; original_court_info?: object; pacer_case_id?: string; panel?: string[]; panel_str?: string; referred_to?: string; referred_to_str?: string; resource_uri?: string; slug?: string; source?: number; tags?: string[]; }`\n\n  - `id?: number`\n  - `absolute_url?: string`\n  - `appeal_from?: string`\n  - `appeal_from_str?: string`\n  - `appellate_case_type_information?: string`\n  - `appellate_fee_status?: string`\n  - `assigned_to?: string`\n  - `assigned_to_str?: string`\n  - `audio_files?: string[]`\n  - `bankruptcy_information?: object`\n  - `blocked?: boolean`\n  - `case_name?: string`\n  - `case_name_full?: string`\n  - `case_name_short?: string`\n  - `cause?: string`\n  - `clusters?: string[]`\n  - `court?: string`\n  - `court_id?: string`\n  - `date_argued?: string`\n  - `date_blocked?: string`\n  - `date_cert_denied?: string`\n  - `date_cert_granted?: string`\n  - `date_created?: string`\n  - `date_filed?: string`\n  - `date_last_filing?: string`\n  - `date_last_index?: string`\n  - `date_modified?: string`\n  - `date_reargued?: string`\n  - `date_reargument_denied?: string`\n  - `date_terminated?: string`\n  - `docket_number?: string`\n  - `docket_number_core?: string`\n  - `filepath_ia?: string`\n  - `filepath_ia_json?: string`\n  - `ia_date_first_change?: string`\n  - `ia_needs_upload?: boolean`\n  - `ia_upload_failure_count?: number`\n  - `idb_data?: object`\n  - `jurisdiction_type?: string`\n  - `jury_demand?: string`\n  - `mdl_status?: string`\n  - `nature_of_suit?: string`\n  - `original_court_info?: object`\n  - `pacer_case_id?: string`\n  - `panel?: string[]`\n  - `panel_str?: string`\n  - `referred_to?: string`\n  - `referred_to_str?: string`\n  - `resource_uri?: string`\n  - `slug?: string`\n  - `source?: number`\n  - `tags?: string[]`\n\n### Example\n\n```typescript\nimport CourtListener from 'court-listener-sdk';\n\nconst client = new CourtListener();\n\nconst docket = await client.dockets.retrieve(0);\n\nconsole.log(docket);\n```",
  },
  {
    name: 'list',
    endpoint: '/dockets/',
    httpMethod: 'get',
    summary: 'List dockets',
    description:
      'Returns a paginated list of dockets. Dockets sit at the top of the case law\nhierarchy, linking to clusters of opinions.\n\n**Note**: The response does not inline docket entries, parties, or attorneys\n(this does not scale). Use the PACER/RECAP APIs for those.\n',
    stainlessPath: '(resource) dockets > (method) list',
    qualified: 'client.dockets.list',
    params: [
      'id?: number;',
      'blocked?: boolean;',
      'case_name?: string;',
      'cause?: string;',
      "count?: 'on';",
      'court?: string;',
      'court__jurisdiction?: string;',
      'court__jurisdiction!?: string;',
      'cursor?: string;',
      'date_created?: string;',
      'date_created__gte?: string;',
      'date_created__lte?: string;',
      'date_filed?: string;',
      'date_filed__gte?: string;',
      'date_filed__lte?: string;',
      'date_modified?: string;',
      'date_modified__gte?: string;',
      'date_modified__lte?: string;',
      'date_terminated?: string;',
      'date_terminated__gte?: string;',
      'date_terminated__lte?: string;',
      'docket_number?: string;',
      'fields?: string;',
      "format?: 'json' | 'xml' | 'html';",
      'id__gt?: number;',
      'id__gte?: number;',
      'id__lt?: number;',
      'id__lte?: number;',
      'id__range?: string;',
      'nature_of_suit?: string;',
      'omit?: string;',
      'order_by?: string;',
      'page?: number;',
      'source?: number;',
    ],
    response: 'object',
    markdown:
      "## list\n\n`client.dockets.list(id?: number, blocked?: boolean, case_name?: string, cause?: string, count?: 'on', court?: string, court__jurisdiction?: string, court__jurisdiction!?: string, cursor?: string, date_created?: string, date_created__gte?: string, date_created__lte?: string, date_filed?: string, date_filed__gte?: string, date_filed__lte?: string, date_modified?: string, date_modified__gte?: string, date_modified__lte?: string, date_terminated?: string, date_terminated__gte?: string, date_terminated__lte?: string, docket_number?: string, fields?: string, format?: 'json' | 'xml' | 'html', id__gt?: number, id__gte?: number, id__lt?: number, id__lte?: number, id__range?: string, nature_of_suit?: string, omit?: string, order_by?: string, page?: number, source?: number): { id?: number; absolute_url?: string; appeal_from?: string; appeal_from_str?: string; appellate_case_type_information?: string; appellate_fee_status?: string; assigned_to?: string; assigned_to_str?: string; audio_files?: string[]; bankruptcy_information?: object; blocked?: boolean; case_name?: string; case_name_full?: string; case_name_short?: string; cause?: string; clusters?: string[]; court?: string; court_id?: string; date_argued?: string; date_blocked?: string; date_cert_denied?: string; date_cert_granted?: string; date_created?: string; date_filed?: string; date_last_filing?: string; date_last_index?: string; date_modified?: string; date_reargued?: string; date_reargument_denied?: string; date_terminated?: string; docket_number?: string; docket_number_core?: string; filepath_ia?: string; filepath_ia_json?: string; ia_date_first_change?: string; ia_needs_upload?: boolean; ia_upload_failure_count?: number; idb_data?: object; jurisdiction_type?: string; jury_demand?: string; mdl_status?: string; nature_of_suit?: string; original_court_info?: object; pacer_case_id?: string; panel?: string[]; panel_str?: string; referred_to?: string; referred_to_str?: string; resource_uri?: string; slug?: string; source?: number; tags?: string[]; }`\n\n**get** `/dockets/`\n\nReturns a paginated list of dockets. Dockets sit at the top of the case law\nhierarchy, linking to clusters of opinions.\n\n**Note**: The response does not inline docket entries, parties, or attorneys\n(this does not scale). Use the PACER/RECAP APIs for those.\n\n\n### Parameters\n\n- `id?: number`\n  Filter by docket ID (exact).\n\n- `blocked?: boolean`\n  Filter for blocked/unblocked dockets.\n\n- `case_name?: string`\n  Filter by case name.\n\n- `cause?: string`\n  Filter by cause.\n\n- `count?: 'on'`\n  Set to `on` to return only the total count of matching items without\nresult data. When enabled, pagination parameters are ignored.\n\n- `court?: string`\n  Filter by court identifier (e.g. `scotus`). Supports related court filters via `court__` prefix.\n\n- `court__jurisdiction?: string`\n  Filter by the court's jurisdiction type (e.g. `F`, `FD`, `S`).\n\n- `court__jurisdiction!?: string`\n  Exclude dockets from this jurisdiction type.\n\n- `cursor?: string`\n  Cursor token for deep pagination. Returned in the `next` / `previous`\nfields of paginated responses. Available when ordering by `id`,\n`date_modified`, or `date_created`.\n\n\n- `date_created?: string`\n  Filter by exact creation date.\n\n- `date_created__gte?: string`\n  Created on or after this date.\n\n- `date_created__lte?: string`\n  Created on or before this date.\n\n- `date_filed?: string`\n  Filter by filing date.\n\n- `date_filed__gte?: string`\n  Filed on or after this date.\n\n- `date_filed__lte?: string`\n  Filed on or before this date.\n\n- `date_modified?: string`\n  Filter by exact modification date.\n\n- `date_modified__gte?: string`\n  Modified on or after this date.\n\n- `date_modified__lte?: string`\n  Modified on or before this date.\n\n- `date_terminated?: string`\n  Filter by termination date.\n\n- `date_terminated__gte?: string`\n\n- `date_terminated__lte?: string`\n\n- `docket_number?: string`\n  Filter by exact docket number (e.g. `23A994`).\n\n- `fields?: string`\n  Comma-separated list of fields to include. Supports nested fields via\ndouble-underscore notation (e.g. `educations__id`).\n\n\n- `format?: 'json' | 'xml' | 'html'`\n  Response serialization format. JSON is default when no `Accept` header\nis provided.\n\n- `id__gt?: number`\n  Docket IDs greater than this value.\n\n- `id__gte?: number`\n  Docket IDs greater than or equal to this value.\n\n- `id__lt?: number`\n  Docket IDs less than this value.\n\n- `id__lte?: number`\n  Docket IDs less than or equal to this value.\n\n- `id__range?: string`\n  Docket IDs within an inclusive range (e.g. `500,1000`).\n\n- `nature_of_suit?: string`\n  Filter by nature of suit.\n\n- `omit?: string`\n  Comma-separated list of fields to exclude. Supports nested fields via\ndouble-underscore notation.\n\n\n- `order_by?: string`\n  Comma-separated list of fields to order by. Prefix with `-` for\ndescending order. Use a secondary field as a tie-breaker for\ndeterministic ordering (e.g. `date_filed,id`).\n\n\n- `page?: number`\n  Page number for standard pagination (limited to 100 pages).\n\n- `source?: number`\n  Filter by docket source.\n\n### Returns\n\n- `{ id?: number; absolute_url?: string; appeal_from?: string; appeal_from_str?: string; appellate_case_type_information?: string; appellate_fee_status?: string; assigned_to?: string; assigned_to_str?: string; audio_files?: string[]; bankruptcy_information?: object; blocked?: boolean; case_name?: string; case_name_full?: string; case_name_short?: string; cause?: string; clusters?: string[]; court?: string; court_id?: string; date_argued?: string; date_blocked?: string; date_cert_denied?: string; date_cert_granted?: string; date_created?: string; date_filed?: string; date_last_filing?: string; date_last_index?: string; date_modified?: string; date_reargued?: string; date_reargument_denied?: string; date_terminated?: string; docket_number?: string; docket_number_core?: string; filepath_ia?: string; filepath_ia_json?: string; ia_date_first_change?: string; ia_needs_upload?: boolean; ia_upload_failure_count?: number; idb_data?: object; jurisdiction_type?: string; jury_demand?: string; mdl_status?: string; nature_of_suit?: string; original_court_info?: object; pacer_case_id?: string; panel?: string[]; panel_str?: string; referred_to?: string; referred_to_str?: string; resource_uri?: string; slug?: string; source?: number; tags?: string[]; }`\n\n  - `id?: number`\n  - `absolute_url?: string`\n  - `appeal_from?: string`\n  - `appeal_from_str?: string`\n  - `appellate_case_type_information?: string`\n  - `appellate_fee_status?: string`\n  - `assigned_to?: string`\n  - `assigned_to_str?: string`\n  - `audio_files?: string[]`\n  - `bankruptcy_information?: object`\n  - `blocked?: boolean`\n  - `case_name?: string`\n  - `case_name_full?: string`\n  - `case_name_short?: string`\n  - `cause?: string`\n  - `clusters?: string[]`\n  - `court?: string`\n  - `court_id?: string`\n  - `date_argued?: string`\n  - `date_blocked?: string`\n  - `date_cert_denied?: string`\n  - `date_cert_granted?: string`\n  - `date_created?: string`\n  - `date_filed?: string`\n  - `date_last_filing?: string`\n  - `date_last_index?: string`\n  - `date_modified?: string`\n  - `date_reargued?: string`\n  - `date_reargument_denied?: string`\n  - `date_terminated?: string`\n  - `docket_number?: string`\n  - `docket_number_core?: string`\n  - `filepath_ia?: string`\n  - `filepath_ia_json?: string`\n  - `ia_date_first_change?: string`\n  - `ia_needs_upload?: boolean`\n  - `ia_upload_failure_count?: number`\n  - `idb_data?: object`\n  - `jurisdiction_type?: string`\n  - `jury_demand?: string`\n  - `mdl_status?: string`\n  - `nature_of_suit?: string`\n  - `original_court_info?: object`\n  - `pacer_case_id?: string`\n  - `panel?: string[]`\n  - `panel_str?: string`\n  - `referred_to?: string`\n  - `referred_to_str?: string`\n  - `resource_uri?: string`\n  - `slug?: string`\n  - `source?: number`\n  - `tags?: string[]`\n\n### Example\n\n```typescript\nimport CourtListener from 'court-listener-sdk';\n\nconst client = new CourtListener();\n\n// Automatically fetches more pages as needed.\nfor await (const docket of client.dockets.list()) {\n  console.log(docket);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/clusters/{id}/',
    httpMethod: 'get',
    summary: 'Retrieve a single opinion cluster',
    description:
      'Look up a cluster by its ID. The cluster ID matches the ID used in\nCourtListener case law URLs (e.g. `/opinion/2812209/obergefell-v-hodges/`\ncorresponds to cluster ID `2812209`).\n',
    stainlessPath: '(resource) clusters > (method) retrieve',
    qualified: 'client.clusters.retrieve',
    params: ['id: number;', 'fields?: string;', "format?: 'json' | 'xml' | 'html';", 'omit?: string;'],
    response:
      '{ id?: number; absolute_url?: string; blocked?: boolean; case_name?: string; case_name_full?: string; case_name_short?: string; citation_count?: number; citations?: { page?: string; reporter?: string; type?: number; volume?: number; }[]; correction?: string; cross_reference?: string; date_blocked?: string; date_created?: string; date_filed?: string; date_filed_is_approximate?: boolean; date_modified?: string; disposition?: string; docket?: string; headnotes?: string; history?: string; judges?: string; non_participating_judges?: string[]; other_dates?: string; panel?: string[]; precedential_status?: string; resource_uri?: string; slug?: string; source?: string; sub_opinions?: string[]; summary?: string; syllabus?: string; }',
    markdown:
      "## retrieve\n\n`client.clusters.retrieve(id: number, fields?: string, format?: 'json' | 'xml' | 'html', omit?: string): { id?: number; absolute_url?: string; blocked?: boolean; case_name?: string; case_name_full?: string; case_name_short?: string; citation_count?: number; citations?: object[]; correction?: string; cross_reference?: string; date_blocked?: string; date_created?: string; date_filed?: string; date_filed_is_approximate?: boolean; date_modified?: string; disposition?: string; docket?: string; headnotes?: string; history?: string; judges?: string; non_participating_judges?: string[]; other_dates?: string; panel?: string[]; precedential_status?: string; resource_uri?: string; slug?: string; source?: string; sub_opinions?: string[]; summary?: string; syllabus?: string; }`\n\n**get** `/clusters/{id}/`\n\nLook up a cluster by its ID. The cluster ID matches the ID used in\nCourtListener case law URLs (e.g. `/opinion/2812209/obergefell-v-hodges/`\ncorresponds to cluster ID `2812209`).\n\n\n### Parameters\n\n- `id: number`\n\n- `fields?: string`\n  Comma-separated list of fields to include. Supports nested fields via\ndouble-underscore notation (e.g. `educations__id`).\n\n\n- `format?: 'json' | 'xml' | 'html'`\n  Response serialization format. JSON is default when no `Accept` header\nis provided.\n\n- `omit?: string`\n  Comma-separated list of fields to exclude. Supports nested fields via\ndouble-underscore notation.\n\n\n### Returns\n\n- `{ id?: number; absolute_url?: string; blocked?: boolean; case_name?: string; case_name_full?: string; case_name_short?: string; citation_count?: number; citations?: { page?: string; reporter?: string; type?: number; volume?: number; }[]; correction?: string; cross_reference?: string; date_blocked?: string; date_created?: string; date_filed?: string; date_filed_is_approximate?: boolean; date_modified?: string; disposition?: string; docket?: string; headnotes?: string; history?: string; judges?: string; non_participating_judges?: string[]; other_dates?: string; panel?: string[]; precedential_status?: string; resource_uri?: string; slug?: string; source?: string; sub_opinions?: string[]; summary?: string; syllabus?: string; }`\n\n  - `id?: number`\n  - `absolute_url?: string`\n  - `blocked?: boolean`\n  - `case_name?: string`\n  - `case_name_full?: string`\n  - `case_name_short?: string`\n  - `citation_count?: number`\n  - `citations?: { page?: string; reporter?: string; type?: number; volume?: number; }[]`\n  - `correction?: string`\n  - `cross_reference?: string`\n  - `date_blocked?: string`\n  - `date_created?: string`\n  - `date_filed?: string`\n  - `date_filed_is_approximate?: boolean`\n  - `date_modified?: string`\n  - `disposition?: string`\n  - `docket?: string`\n  - `headnotes?: string`\n  - `history?: string`\n  - `judges?: string`\n  - `non_participating_judges?: string[]`\n  - `other_dates?: string`\n  - `panel?: string[]`\n  - `precedential_status?: string`\n  - `resource_uri?: string`\n  - `slug?: string`\n  - `source?: string`\n  - `sub_opinions?: string[]`\n  - `summary?: string`\n  - `syllabus?: string`\n\n### Example\n\n```typescript\nimport CourtListener from 'court-listener-sdk';\n\nconst client = new CourtListener();\n\nconst cluster = await client.clusters.retrieve(0);\n\nconsole.log(cluster);\n```",
  },
  {
    name: 'list',
    endpoint: '/clusters/',
    httpMethod: 'get',
    summary: 'List opinion clusters',
    description:
      'Returns a paginated list of opinion clusters. Each cluster groups together\nopinions from the same panel hearing (e.g. majority, dissent, concurrence).\nThe cluster `id` is used in CourtListener case law URLs.\n',
    stainlessPath: '(resource) clusters > (method) list',
    qualified: 'client.clusters.list',
    params: [
      'id?: number;',
      'citation?: string;',
      "count?: 'on';",
      'cursor?: string;',
      'date_created?: string;',
      'date_created__gte?: string;',
      'date_created__lte?: string;',
      'date_filed?: string;',
      'date_filed__gte?: string;',
      'date_filed__lte?: string;',
      'date_modified?: string;',
      'date_modified__gte?: string;',
      'date_modified__lte?: string;',
      'docket?: number;',
      'docket__court?: string;',
      'docket__docket_number?: string;',
      'fields?: string;',
      "format?: 'json' | 'xml' | 'html';",
      'id__gt?: number;',
      'id__gte?: number;',
      'id__lt?: number;',
      'id__lte?: number;',
      'id__range?: string;',
      'judges?: string;',
      'omit?: string;',
      'order_by?: string;',
      'page?: number;',
    ],
    response:
      '{ id?: number; absolute_url?: string; blocked?: boolean; case_name?: string; case_name_full?: string; case_name_short?: string; citation_count?: number; citations?: { page?: string; reporter?: string; type?: number; volume?: number; }[]; correction?: string; cross_reference?: string; date_blocked?: string; date_created?: string; date_filed?: string; date_filed_is_approximate?: boolean; date_modified?: string; disposition?: string; docket?: string; headnotes?: string; history?: string; judges?: string; non_participating_judges?: string[]; other_dates?: string; panel?: string[]; precedential_status?: string; resource_uri?: string; slug?: string; source?: string; sub_opinions?: string[]; summary?: string; syllabus?: string; }',
    markdown:
      "## list\n\n`client.clusters.list(id?: number, citation?: string, count?: 'on', cursor?: string, date_created?: string, date_created__gte?: string, date_created__lte?: string, date_filed?: string, date_filed__gte?: string, date_filed__lte?: string, date_modified?: string, date_modified__gte?: string, date_modified__lte?: string, docket?: number, docket__court?: string, docket__docket_number?: string, fields?: string, format?: 'json' | 'xml' | 'html', id__gt?: number, id__gte?: number, id__lt?: number, id__lte?: number, id__range?: string, judges?: string, omit?: string, order_by?: string, page?: number): { id?: number; absolute_url?: string; blocked?: boolean; case_name?: string; case_name_full?: string; case_name_short?: string; citation_count?: number; citations?: object[]; correction?: string; cross_reference?: string; date_blocked?: string; date_created?: string; date_filed?: string; date_filed_is_approximate?: boolean; date_modified?: string; disposition?: string; docket?: string; headnotes?: string; history?: string; judges?: string; non_participating_judges?: string[]; other_dates?: string; panel?: string[]; precedential_status?: string; resource_uri?: string; slug?: string; source?: string; sub_opinions?: string[]; summary?: string; syllabus?: string; }`\n\n**get** `/clusters/`\n\nReturns a paginated list of opinion clusters. Each cluster groups together\nopinions from the same panel hearing (e.g. majority, dissent, concurrence).\nThe cluster `id` is used in CourtListener case law URLs.\n\n\n### Parameters\n\n- `id?: number`\n  Filter by cluster ID.\n\n- `citation?: string`\n  Filter by citation.\n\n- `count?: 'on'`\n  Set to `on` to return only the total count of matching items without\nresult data. When enabled, pagination parameters are ignored.\n\n- `cursor?: string`\n  Cursor token for deep pagination. Returned in the `next` / `previous`\nfields of paginated responses. Available when ordering by `id`,\n`date_modified`, or `date_created`.\n\n\n- `date_created?: string`\n\n- `date_created__gte?: string`\n\n- `date_created__lte?: string`\n\n- `date_filed?: string`\n  Filter by the date the cluster was filed.\n\n- `date_filed__gte?: string`\n\n- `date_filed__lte?: string`\n\n- `date_modified?: string`\n\n- `date_modified__gte?: string`\n\n- `date_modified__lte?: string`\n\n- `docket?: number`\n  Filter by parent docket ID.\n\n- `docket__court?: string`\n  Filter by the court of the parent docket (e.g. `scotus`).\n\n- `docket__docket_number?: string`\n  Filter by the docket number of the parent docket.\n\n- `fields?: string`\n  Comma-separated list of fields to include. Supports nested fields via\ndouble-underscore notation (e.g. `educations__id`).\n\n\n- `format?: 'json' | 'xml' | 'html'`\n  Response serialization format. JSON is default when no `Accept` header\nis provided.\n\n- `id__gt?: number`\n\n- `id__gte?: number`\n\n- `id__lt?: number`\n\n- `id__lte?: number`\n\n- `id__range?: string`\n  Inclusive range (e.g. `100,500`).\n\n- `judges?: string`\n  Filter by judge name string.\n\n- `omit?: string`\n  Comma-separated list of fields to exclude. Supports nested fields via\ndouble-underscore notation.\n\n\n- `order_by?: string`\n  Comma-separated list of fields to order by. Prefix with `-` for\ndescending order. Use a secondary field as a tie-breaker for\ndeterministic ordering (e.g. `date_filed,id`).\n\n\n- `page?: number`\n  Page number for standard pagination (limited to 100 pages).\n\n### Returns\n\n- `{ id?: number; absolute_url?: string; blocked?: boolean; case_name?: string; case_name_full?: string; case_name_short?: string; citation_count?: number; citations?: { page?: string; reporter?: string; type?: number; volume?: number; }[]; correction?: string; cross_reference?: string; date_blocked?: string; date_created?: string; date_filed?: string; date_filed_is_approximate?: boolean; date_modified?: string; disposition?: string; docket?: string; headnotes?: string; history?: string; judges?: string; non_participating_judges?: string[]; other_dates?: string; panel?: string[]; precedential_status?: string; resource_uri?: string; slug?: string; source?: string; sub_opinions?: string[]; summary?: string; syllabus?: string; }`\n\n  - `id?: number`\n  - `absolute_url?: string`\n  - `blocked?: boolean`\n  - `case_name?: string`\n  - `case_name_full?: string`\n  - `case_name_short?: string`\n  - `citation_count?: number`\n  - `citations?: { page?: string; reporter?: string; type?: number; volume?: number; }[]`\n  - `correction?: string`\n  - `cross_reference?: string`\n  - `date_blocked?: string`\n  - `date_created?: string`\n  - `date_filed?: string`\n  - `date_filed_is_approximate?: boolean`\n  - `date_modified?: string`\n  - `disposition?: string`\n  - `docket?: string`\n  - `headnotes?: string`\n  - `history?: string`\n  - `judges?: string`\n  - `non_participating_judges?: string[]`\n  - `other_dates?: string`\n  - `panel?: string[]`\n  - `precedential_status?: string`\n  - `resource_uri?: string`\n  - `slug?: string`\n  - `source?: string`\n  - `sub_opinions?: string[]`\n  - `summary?: string`\n  - `syllabus?: string`\n\n### Example\n\n```typescript\nimport CourtListener from 'court-listener-sdk';\n\nconst client = new CourtListener();\n\n// Automatically fetches more pages as needed.\nfor await (const cluster of client.clusters.list()) {\n  console.log(cluster);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/opinions/{id}/',
    httpMethod: 'get',
    summary: 'Retrieve a single opinion',
    description:
      'Look up an opinion by its ID. Note that opinion IDs do **not** reliably\nmatch cluster IDs. If you have a CourtListener case URL, use the cluster\nAPI to look it up.\n',
    stainlessPath: '(resource) opinions > (method) retrieve',
    qualified: 'client.opinions.retrieve',
    params: ['id: number;', 'fields?: string;', "format?: 'json' | 'xml' | 'html';", 'omit?: string;'],
    response:
      '{ id?: number; author?: string; author_str?: string; cluster?: string; date_created?: string; date_modified?: string; download_url?: string; extracted_by_ocr?: boolean; html?: string; html_anon_2020?: string; html_columbia?: string; html_lawbox?: string; html_with_citations?: string; joined_by?: string[]; local_path?: string; opinions_cited?: string[]; ordering_key?: number; per_curiam?: boolean; plain_text?: string; resource_uri?: string; sha1?: string; type?: string; xml_harvard?: string; }',
    markdown:
      "## retrieve\n\n`client.opinions.retrieve(id: number, fields?: string, format?: 'json' | 'xml' | 'html', omit?: string): { id?: number; author?: string; author_str?: string; cluster?: string; date_created?: string; date_modified?: string; download_url?: string; extracted_by_ocr?: boolean; html?: string; html_anon_2020?: string; html_columbia?: string; html_lawbox?: string; html_with_citations?: string; joined_by?: string[]; local_path?: string; opinions_cited?: string[]; ordering_key?: number; per_curiam?: boolean; plain_text?: string; resource_uri?: string; sha1?: string; type?: string; xml_harvard?: string; }`\n\n**get** `/opinions/{id}/`\n\nLook up an opinion by its ID. Note that opinion IDs do **not** reliably\nmatch cluster IDs. If you have a CourtListener case URL, use the cluster\nAPI to look it up.\n\n\n### Parameters\n\n- `id: number`\n\n- `fields?: string`\n  Comma-separated list of fields to include. Supports nested fields via\ndouble-underscore notation (e.g. `educations__id`).\n\n\n- `format?: 'json' | 'xml' | 'html'`\n  Response serialization format. JSON is default when no `Accept` header\nis provided.\n\n- `omit?: string`\n  Comma-separated list of fields to exclude. Supports nested fields via\ndouble-underscore notation.\n\n\n### Returns\n\n- `{ id?: number; author?: string; author_str?: string; cluster?: string; date_created?: string; date_modified?: string; download_url?: string; extracted_by_ocr?: boolean; html?: string; html_anon_2020?: string; html_columbia?: string; html_lawbox?: string; html_with_citations?: string; joined_by?: string[]; local_path?: string; opinions_cited?: string[]; ordering_key?: number; per_curiam?: boolean; plain_text?: string; resource_uri?: string; sha1?: string; type?: string; xml_harvard?: string; }`\n\n  - `id?: number`\n  - `author?: string`\n  - `author_str?: string`\n  - `cluster?: string`\n  - `date_created?: string`\n  - `date_modified?: string`\n  - `download_url?: string`\n  - `extracted_by_ocr?: boolean`\n  - `html?: string`\n  - `html_anon_2020?: string`\n  - `html_columbia?: string`\n  - `html_lawbox?: string`\n  - `html_with_citations?: string`\n  - `joined_by?: string[]`\n  - `local_path?: string`\n  - `opinions_cited?: string[]`\n  - `ordering_key?: number`\n  - `per_curiam?: boolean`\n  - `plain_text?: string`\n  - `resource_uri?: string`\n  - `sha1?: string`\n  - `type?: string`\n  - `xml_harvard?: string`\n\n### Example\n\n```typescript\nimport CourtListener from 'court-listener-sdk';\n\nconst client = new CourtListener();\n\nconst opinion = await client.opinions.retrieve(0);\n\nconsole.log(opinion);\n```",
  },
  {
    name: 'list',
    endpoint: '/opinions/',
    httpMethod: 'get',
    summary: 'List opinions',
    description:
      "Returns a paginated list of opinions. Each opinion contains the text of a\njudicial decision and metadata about the authoring judge.\n\n**Tip**: Prefer the `html_with_citations` field for opinion text — it contains\nthe raw text with identified and linked citations, and is the field used on\nthe CourtListener website.\n\nUse `fields` / `omit` parameters to exclude large text fields you don't need.\n",
    stainlessPath: '(resource) opinions > (method) list',
    qualified: 'client.opinions.list',
    params: [
      'id?: number;',
      'cited_opinion?: number;',
      'cluster?: number;',
      'cluster__docket__court?: string;',
      'cluster__docket__docket_number?: string;',
      "count?: 'on';",
      'cursor?: string;',
      'date_created?: string;',
      'date_created__gte?: string;',
      'date_created__lte?: string;',
      'date_modified?: string;',
      'date_modified__gte?: string;',
      'date_modified__lte?: string;',
      'fields?: string;',
      "format?: 'json' | 'xml' | 'html';",
      'id__gt?: number;',
      'id__gte?: number;',
      'id__lt?: number;',
      'id__lte?: number;',
      'id__range?: string;',
      'omit?: string;',
      'order_by?: string;',
      'page?: number;',
      'type?: string;',
    ],
    response:
      '{ id?: number; author?: string; author_str?: string; cluster?: string; date_created?: string; date_modified?: string; download_url?: string; extracted_by_ocr?: boolean; html?: string; html_anon_2020?: string; html_columbia?: string; html_lawbox?: string; html_with_citations?: string; joined_by?: string[]; local_path?: string; opinions_cited?: string[]; ordering_key?: number; per_curiam?: boolean; plain_text?: string; resource_uri?: string; sha1?: string; type?: string; xml_harvard?: string; }',
    markdown:
      "## list\n\n`client.opinions.list(id?: number, cited_opinion?: number, cluster?: number, cluster__docket__court?: string, cluster__docket__docket_number?: string, count?: 'on', cursor?: string, date_created?: string, date_created__gte?: string, date_created__lte?: string, date_modified?: string, date_modified__gte?: string, date_modified__lte?: string, fields?: string, format?: 'json' | 'xml' | 'html', id__gt?: number, id__gte?: number, id__lt?: number, id__lte?: number, id__range?: string, omit?: string, order_by?: string, page?: number, type?: string): { id?: number; author?: string; author_str?: string; cluster?: string; date_created?: string; date_modified?: string; download_url?: string; extracted_by_ocr?: boolean; html?: string; html_anon_2020?: string; html_columbia?: string; html_lawbox?: string; html_with_citations?: string; joined_by?: string[]; local_path?: string; opinions_cited?: string[]; ordering_key?: number; per_curiam?: boolean; plain_text?: string; resource_uri?: string; sha1?: string; type?: string; xml_harvard?: string; }`\n\n**get** `/opinions/`\n\nReturns a paginated list of opinions. Each opinion contains the text of a\njudicial decision and metadata about the authoring judge.\n\n**Tip**: Prefer the `html_with_citations` field for opinion text — it contains\nthe raw text with identified and linked citations, and is the field used on\nthe CourtListener website.\n\nUse `fields` / `omit` parameters to exclude large text fields you don't need.\n\n\n### Parameters\n\n- `id?: number`\n  Filter by opinion ID.\n\n- `cited_opinion?: number`\n  Filter opinions that cite this opinion ID.\n\n- `cluster?: number`\n  Filter by parent cluster ID.\n\n- `cluster__docket__court?: string`\n  Filter by court via the cluster's docket (e.g. `scotus`).\n\n- `cluster__docket__docket_number?: string`\n  Filter by docket number via the cluster's docket.\n\n- `count?: 'on'`\n  Set to `on` to return only the total count of matching items without\nresult data. When enabled, pagination parameters are ignored.\n\n- `cursor?: string`\n  Cursor token for deep pagination. Returned in the `next` / `previous`\nfields of paginated responses. Available when ordering by `id`,\n`date_modified`, or `date_created`.\n\n\n- `date_created?: string`\n\n- `date_created__gte?: string`\n\n- `date_created__lte?: string`\n\n- `date_modified?: string`\n\n- `date_modified__gte?: string`\n\n- `date_modified__lte?: string`\n\n- `fields?: string`\n  Comma-separated list of fields to include. Supports nested fields via\ndouble-underscore notation (e.g. `educations__id`).\n\n\n- `format?: 'json' | 'xml' | 'html'`\n  Response serialization format. JSON is default when no `Accept` header\nis provided.\n\n- `id__gt?: number`\n\n- `id__gte?: number`\n\n- `id__lt?: number`\n\n- `id__lte?: number`\n\n- `id__range?: string`\n\n- `omit?: string`\n  Comma-separated list of fields to exclude. Supports nested fields via\ndouble-underscore notation.\n\n\n- `order_by?: string`\n  Comma-separated list of fields to order by. Prefix with `-` for\ndescending order. Use a secondary field as a tie-breaker for\ndeterministic ordering (e.g. `date_filed,id`).\n\n\n- `page?: number`\n  Page number for standard pagination (limited to 100 pages).\n\n- `type?: string`\n  Filter by opinion type. Values are prefixed with numbers for sort order.\nCommon types include combined opinion, lead opinion, concurrence, dissent, etc.\n\n\n### Returns\n\n- `{ id?: number; author?: string; author_str?: string; cluster?: string; date_created?: string; date_modified?: string; download_url?: string; extracted_by_ocr?: boolean; html?: string; html_anon_2020?: string; html_columbia?: string; html_lawbox?: string; html_with_citations?: string; joined_by?: string[]; local_path?: string; opinions_cited?: string[]; ordering_key?: number; per_curiam?: boolean; plain_text?: string; resource_uri?: string; sha1?: string; type?: string; xml_harvard?: string; }`\n\n  - `id?: number`\n  - `author?: string`\n  - `author_str?: string`\n  - `cluster?: string`\n  - `date_created?: string`\n  - `date_modified?: string`\n  - `download_url?: string`\n  - `extracted_by_ocr?: boolean`\n  - `html?: string`\n  - `html_anon_2020?: string`\n  - `html_columbia?: string`\n  - `html_lawbox?: string`\n  - `html_with_citations?: string`\n  - `joined_by?: string[]`\n  - `local_path?: string`\n  - `opinions_cited?: string[]`\n  - `ordering_key?: number`\n  - `per_curiam?: boolean`\n  - `plain_text?: string`\n  - `resource_uri?: string`\n  - `sha1?: string`\n  - `type?: string`\n  - `xml_harvard?: string`\n\n### Example\n\n```typescript\nimport CourtListener from 'court-listener-sdk';\n\nconst client = new CourtListener();\n\n// Automatically fetches more pages as needed.\nfor await (const opinion of client.opinions.list()) {\n  console.log(opinion);\n}\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
