import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { EmailService } from "../../../../services/email.service";
import { EmailMessage } from "../../../../models/email-message.model";
import { RoutingService } from "src/app/services/routing.service";

import { LocationData } from "../../../../models/location-data.model";
import { LocationService } from "../../../../services/location.service";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
})
export class ContactFormComponent implements OnInit {
  @Output() emailReceivedEvent = new EventEmitter<boolean>();
  constructor(
    private emailService: EmailService,
    private routingService: RoutingService,
    private locationService: LocationService
  ) {}

  emailReceived: boolean = false;

  ngOnInit() {}

  submit(form: NgForm) {
    const messageParams = new EmailMessage(
      form.value.name,
      form.value.email,
      form.value.message
    );
    this.locationService
      .getLocationJSON()
      .subscribe((locationData: LocationData) => {
        this.emailService.sendSiteVisitEmail(locationData).subscribe(() => {});
      });
    this.emailService.sendContactEmail(messageParams).subscribe((data: any) => {
      if (data.name) {
        this.emailReceived = true;
        this.emailReceivedEvent.emit(true);
      }
    });
  }

  goToSite() {
    this.routingService.navigateToHomePage();
  }
}
