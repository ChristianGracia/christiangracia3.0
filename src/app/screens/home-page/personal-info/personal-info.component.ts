import { Component, OnInit, SystemJsNgModuleLoader } from "@angular/core";
import { RoutingService } from "../../../services/routing.service";
import { EmailService } from "src/app/services/email.service";
import { LocationService } from "../../../services/location.service";
import { LocationData } from "src/app/models/location-data.model";

@Component({
  selector: "app-personal-info",
  templateUrl: "./personal-info.component.html",
  styleUrls: ["./personal-info.component.scss"],
})
export class PersonalInfoComponent implements OnInit {
  constructor(
    private routingService: RoutingService,
    private emailService: EmailService,
    private locationService: LocationService,
  ) {}

  public showCopiedText = false;

  public showCopyHint = false;

  public showDownArrow = false;

  public showTechAnimation = false;

  ngOnInit() {
    this.showDownArrowAnimation();
    setTimeout(() => {
      this.showTechAnimation = true;
    }, 3000);
  }

  showDownArrowAnimation() {
    setTimeout(() => {
      this.showDownArrow = true;
      setTimeout(() => {
        this.showDownArrow = false;
      }, 4000);
    }, 2000);
  }
  navigateToSiteContent() {
    this.locationService.getLocationJSON().subscribe(
      (locationData: LocationData) => { // (locationData: LocationData) => {
        this.emailService.sendSiteVisitEmail(locationData).subscribe(() => {});
      },
    );
    this.routingService.navigateToSiteContent();
  }
  copyToKeyboard() {
    this.showCopyHint = false;

    var mockElement = document.createElement("textarea");
    mockElement.value = "christianmgracia@gmail.com";
    document.body.appendChild(mockElement);
    mockElement.select();
    document.execCommand("Copy");
    mockElement.remove();

    this.showCopiedText = true;
    setTimeout(() => {
      this.showCopiedText = false;
    }, 1000);
  }
}
