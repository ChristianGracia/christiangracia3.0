import { Component, OnInit } from "@angular/core";
import { GithubService } from "../../../shared-components/services/github.service";
import { Repo } from "../../models/github-repo.model";
import { ViewCommitModalComponent } from "../../modals/view-commit-modal/view-commit-modal.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { formatDateAndTime } from "../../../../util/dateMethods";

@Component({
  selector: "app-github-repo",
  templateUrl: "./github-repo.component.html",
  styleUrls: ["./github-repo.component.scss"],
})
export class GithubRepoComponent implements OnInit {
  public gitRepos: Repo[] = [];
  public data: Repo[] = [];
  window: Window = window;
  page = 0;
  size = 5;

  constructor(private githubService: GithubService, public dialog: MatDialog) {}

  public loadingRepos: boolean = false;

  ngOnInit() {
    this.getGithubRepos();
  }

  getGithubRepos() {
    this.loadingRepos = true;
    this.githubService.getAllRepos().subscribe((repos: Repo[]) => {
      this.gitRepos = repos;
      this.loadingRepos = false;
      this.getData({ pageIndex: this.page, pageSize: this.size });
    });
  }

  openLink(url: string) {
    window.open(url, "_blank");
  }

  openRepoCommitModal(repoName: string, repoUrl: string) {
    let config = new MatDialogConfig();
    config = {
      height: "100vh",
      width: "100vw",
      panelClass: "full-screen-modal",
      data: {
        repo: repoName,
        url: repoUrl,
      },
    };
    const dialogRef = this.dialog.open(ViewCommitModalComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  formatUpdateAtDate(date: string) {
    return formatDateAndTime(date);
  }

  formatRepoLanguage(language: string) {
    let color = "";

    switch (language) {
      case "Ruby":
        color = "red";
        break;
      case "Java":
        color = "#B07219";
        break;
      case "JavaScript":
        color = "#F0D91D";
        break;
      case "TypeScript":
        color = "#61D2F8";
        break;
      case "C#":
        color = "green";
        break;
      case "C":
        color = "black";
        break;
      case "Python":
        color = "green";
        break;
      case "Rust":
        color = "#B34313";
        break;
      default:
        color = "black";
        break;
    }
    return color;
  }
  getData(obj) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.data = this.gitRepos.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}
