// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorURLPage, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Case-level metadata sitting at the top of the object hierarchy.
 */
export class Dockets extends APIResource {
  /**
   * Retrieve a single docket
   */
  retrieve(
    id: number,
    query: DocketRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Docket> {
    return this._client.get(path`/dockets/${id}/`, { query, ...options });
  }

  /**
   * Returns a paginated list of dockets. Dockets sit at the top of the case law
   * hierarchy, linking to clusters of opinions.
   *
   * **Note**: The response does not inline docket entries, parties, or attorneys
   * (this does not scale). Use the PACER/RECAP APIs for those.
   */
  list(
    query: DocketListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocketsCursorURLPage, Docket> {
    return this._client.getAPIList('/dockets/', CursorURLPage<Docket>, { query, ...options });
  }
}

export type DocketsCursorURLPage = CursorURLPage<Docket>;

export interface Docket {
  id?: number;

  /**
   * Relative URL path on CourtListener.
   */
  absolute_url?: string;

  /**
   * API URL of the court this case was appealed from.
   */
  appeal_from?: string | null;

  appeal_from_str?: string;

  appellate_case_type_information?: string;

  appellate_fee_status?: string;

  /**
   * API URL of the assigned judge.
   */
  assigned_to?: string | null;

  /**
   * Name of the assigned judge (string, not normalized).
   */
  assigned_to_str?: string;

  /**
   * API URLs of related oral argument audio files.
   */
  audio_files?: Array<string>;

  /**
   * Bankruptcy-specific information, if applicable.
   */
  bankruptcy_information?: { [key: string]: unknown } | null;

  blocked?: boolean;

  /**
   * Current case name. May change over time (e.g. if a named party changes). See
   * also the cluster's case_name which is frozen at decision time.
   */
  case_name?: string;

  case_name_full?: string;

  case_name_short?: string;

  cause?: string | null;

  /**
   * API URLs of related opinion clusters.
   */
  clusters?: Array<string>;

  /**
   * API URL of the court.
   */
  court?: string;

  /**
   * Court identifier string.
   */
  court_id?: string;

  date_argued?: string | null;

  date_blocked?: string | null;

  date_cert_denied?: string | null;

  date_cert_granted?: string | null;

  date_created?: string;

  date_filed?: string | null;

  date_last_filing?: string | null;

  date_last_index?: string | null;

  date_modified?: string;

  date_reargued?: string | null;

  date_reargument_denied?: string | null;

  date_terminated?: string | null;

  /**
   * The docket number assigned by the court.
   */
  docket_number?: string;

  /**
   * Normalized core docket number.
   */
  docket_number_core?: string;

  /**
   * URL to the Internet Archive docket file.
   */
  filepath_ia?: string | null;

  /**
   * URL to the Internet Archive JSON docket file.
   */
  filepath_ia_json?: string | null;

  ia_date_first_change?: string | null;

  ia_needs_upload?: boolean | null;

  ia_upload_failure_count?: number | null;

  /**
   * Integrated database data, if available.
   */
  idb_data?: { [key: string]: unknown } | null;

  jurisdiction_type?: string | null;

  jury_demand?: string | null;

  mdl_status?: string;

  nature_of_suit?: string | null;

  /**
   * Original court information, if available.
   */
  original_court_info?: { [key: string]: unknown } | null;

  pacer_case_id?: string | null;

  /**
   * API URLs of judges on the panel.
   */
  panel?: Array<string>;

  panel_str?: string;

  /**
   * API URL of the referred judge.
   */
  referred_to?: string | null;

  referred_to_str?: string;

  resource_uri?: string;

  slug?: string;

  /**
   * Numeric source identifier.
   */
  source?: number;

  /**
   * API URLs of tags on this docket.
   */
  tags?: Array<string>;
}

export interface DocketRetrieveParams {
  /**
   * Comma-separated list of fields to include. Supports nested fields via
   * double-underscore notation (e.g. `educations__id`).
   */
  fields?: string;

  /**
   * Response serialization format. JSON is default when no `Accept` header is
   * provided.
   */
  format?: 'json' | 'xml' | 'html';

  /**
   * Comma-separated list of fields to exclude. Supports nested fields via
   * double-underscore notation.
   */
  omit?: string;
}

export interface DocketListParams {
  /**
   * Filter by docket ID (exact).
   */
  id?: number;

  /**
   * Filter for blocked/unblocked dockets.
   */
  blocked?: boolean;

  /**
   * Filter by case name.
   */
  case_name?: string;

  /**
   * Filter by cause.
   */
  cause?: string;

  /**
   * Set to `on` to return only the total count of matching items without result
   * data. When enabled, pagination parameters are ignored.
   */
  count?: 'on';

  /**
   * Filter by court identifier (e.g. `scotus`). Supports related court filters via
   * `court__` prefix.
   */
  court?: string;

  /**
   * Filter by the court's jurisdiction type (e.g. `F`, `FD`, `S`).
   */
  court__jurisdiction?: string;

  /**
   * Exclude dockets from this jurisdiction type.
   */
  'court__jurisdiction!'?: string;

  /**
   * Cursor token for deep pagination. Returned in the `next` / `previous` fields of
   * paginated responses. Available when ordering by `id`, `date_modified`, or
   * `date_created`.
   */
  cursor?: string;

  /**
   * Filter by exact creation date.
   */
  date_created?: string;

  /**
   * Created on or after this date.
   */
  date_created__gte?: string;

  /**
   * Created on or before this date.
   */
  date_created__lte?: string;

  /**
   * Filter by filing date.
   */
  date_filed?: string;

  /**
   * Filed on or after this date.
   */
  date_filed__gte?: string;

  /**
   * Filed on or before this date.
   */
  date_filed__lte?: string;

  /**
   * Filter by exact modification date.
   */
  date_modified?: string;

  /**
   * Modified on or after this date.
   */
  date_modified__gte?: string;

  /**
   * Modified on or before this date.
   */
  date_modified__lte?: string;

  /**
   * Filter by termination date.
   */
  date_terminated?: string;

  date_terminated__gte?: string;

  date_terminated__lte?: string;

  /**
   * Filter by exact docket number (e.g. `23A994`).
   */
  docket_number?: string;

  /**
   * Comma-separated list of fields to include. Supports nested fields via
   * double-underscore notation (e.g. `educations__id`).
   */
  fields?: string;

  /**
   * Response serialization format. JSON is default when no `Accept` header is
   * provided.
   */
  format?: 'json' | 'xml' | 'html';

  /**
   * Docket IDs greater than this value.
   */
  id__gt?: number;

  /**
   * Docket IDs greater than or equal to this value.
   */
  id__gte?: number;

  /**
   * Docket IDs less than this value.
   */
  id__lt?: number;

  /**
   * Docket IDs less than or equal to this value.
   */
  id__lte?: number;

  /**
   * Docket IDs within an inclusive range (e.g. `500,1000`).
   */
  id__range?: string;

  /**
   * Filter by nature of suit.
   */
  nature_of_suit?: string;

  /**
   * Comma-separated list of fields to exclude. Supports nested fields via
   * double-underscore notation.
   */
  omit?: string;

  /**
   * Comma-separated list of fields to order by. Prefix with `-` for descending
   * order. Use a secondary field as a tie-breaker for deterministic ordering (e.g.
   * `date_filed,id`).
   */
  order_by?: string;

  /**
   * Page number for standard pagination (limited to 100 pages).
   */
  page?: number;

  /**
   * Filter by docket source.
   */
  source?: number;
}

export declare namespace Dockets {
  export {
    type Docket as Docket,
    type DocketsCursorURLPage as DocketsCursorURLPage,
    type DocketRetrieveParams as DocketRetrieveParams,
    type DocketListParams as DocketListParams,
  };
}
