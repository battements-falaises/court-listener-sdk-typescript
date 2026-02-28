// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorURLPage, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Metadata about courts in the CourtListener database.
 */
export class Courts extends APIResource {
  /**
   * Retrieve a single court
   */
  retrieve(
    id: string,
    query: CourtRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Court> {
    return this._client.get(path`/courts/${id}/`, { query, ...options });
  }

  /**
   * Returns a paginated list of courts. Results can generally be cached as court
   * data changes infrequently.
   */
  list(
    query: CourtListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CourtsCursorURLPage, Court> {
    return this._client.getAPIList('/courts/', CursorURLPage<Court>, { query, ...options });
  }
}

export type CourtsCursorURLPage = CursorURLPage<Court>;

export interface Court {
  /**
   * Court identifier (e.g. `scotus`, `ca9`, `dcd`).
   */
  id?: string;

  /**
   * String used for citations from this court.
   */
  citation_string?: string;

  date_created?: string;

  date_modified?: string;

  /**
   * Date the court was dissolved, if applicable.
   */
  end_date?: string | null;

  /**
   * Full name of the court.
   */
  full_name?: string;

  /**
   * Whether this court is currently active.
   */
  in_use?: boolean;

  /**
   * Jurisdiction type code.
   */
  jurisdiction?: string;

  /**
   * Sort position for display.
   */
  position?: number;

  /**
   * Canonical API URL for this court.
   */
  resource_uri?: string;

  /**
   * Short/abbreviated name.
   */
  short_name?: string;

  /**
   * Date the court was founded.
   */
  start_date?: string | null;

  /**
   * Court's website URL.
   */
  url?: string;
}

export interface CourtRetrieveParams {
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

export interface CourtListParams {
  /**
   * Filter by court identifier (e.g. `scotus`, `ca9`, `dcd`).
   */
  id?: string;

  /**
   * Set to `on` to return only the total count of matching items without result
   * data. When enabled, pagination parameters are ignored.
   */
  count?: 'on';

  /**
   * Cursor token for deep pagination. Returned in the `next` / `previous` fields of
   * paginated responses. Available when ordering by `id`, `date_modified`, or
   * `date_created`.
   */
  cursor?: string;

  /**
   * Filter by exact date modified (ISO-8601).
   */
  date_modified?: string;

  /**
   * Filter courts modified on or after this date.
   */
  date_modified__gte?: string;

  /**
   * Filter courts modified on or before this date.
   */
  date_modified__lte?: string;

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
   * Filter by the full name of the court.
   */
  full_name?: string;

  /**
   * Filter courts whose full name starts with the given value.
   */
  full_name__startswith?: string;

  /**
   * Filter by multiple court identifiers (comma-separated).
   */
  id__in?: string;

  /**
   * Filter by jurisdiction type. Common values: `F` (Federal Appellate), `FD`
   * (Federal District), `FB` (Federal Bankruptcy), `FBP` (Federal Bankruptcy Panel),
   * `FS` (Federal Special), `S` (State Supreme), `SA` (State Appellate), `ST` (State
   * Trial), `SS` (State Special), `SAG` (State Attorney General), `T` (Tribal), `I`
   * (International), `C` (Committee), `TES` (Testing).
   */
  jurisdiction?: string;

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
}

export declare namespace Courts {
  export {
    type Court as Court,
    type CourtsCursorURLPage as CourtsCursorURLPage,
    type CourtRetrieveParams as CourtRetrieveParams,
    type CourtListParams as CourtListParams,
  };
}
