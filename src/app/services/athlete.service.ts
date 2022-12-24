import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { config } from '../config';
import { GenerateTokenResponse, GetDashboardResponse } from '../datatypes/APIDataType';

@Injectable({
  providedIn: 'root'
})

/**
 * 
 */
export class AthleteService {

  private accessToken = '';
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.accessToken = 'Bearer ' + this.cookieService.get(config.cookie.athleteId) + '.' + this.cookieService.get(config.cookie.accessToken);
  }

  /**
   * 
   * @returns 
   */

  syncAthleteData(): Observable<any> {
    // url to sync data
    const url = config.toughGuysApi.host + config.toughGuysApi.syncData;
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.accessToken,
      })
    };
    return this.http.post(url,
      {},
      headers)
  }

  /**
   * 
   * @param from 
   * @returns 
   */
  getDashboardData(from: string): Observable<GetDashboardResponse> {
    // url to get dashboard data
    const url = config.toughGuysApi.host + config.toughGuysApi.dashboard;
    // Using the POST method
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.accessToken,
      })
    };


    return this.http.post(url,
      {
        'from': from
      },
      headers) as Observable<GetDashboardResponse>
  }

  /**
   * 
   * @param code 
   * @returns 
   */
  generateToken(code: string): Observable<GenerateTokenResponse> {
    // url to get dashboard data
    const url = config.toughGuysApi.host + config.toughGuysApi.generateToken;
    // Using the POST method
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.accessToken,
      })
    };
    return this.http.post(url,
      {
        'code': code,
      },
      headers) as Observable<GenerateTokenResponse>
  }
}