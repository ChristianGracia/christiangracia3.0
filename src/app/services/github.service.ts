import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Repo } from "../models";

@Injectable({
  providedIn: "root",
})
export class GithubService {
  constructor(private http: HttpClient) {}

  public getAllRepos(): Repo[] {
    return this.http
      .get(environment.apiUrl + "/github/all-repos")
      .pipe((data: Repo[]) => data);
  }
}
