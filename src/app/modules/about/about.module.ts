import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CurrentJobComponent } from "./components/current-job/current-job.component";
import { AboutMeComponent } from "./components/about-me/about-me.component";
import { SharedComponentsModule } from "../shared-components/shared-components.module";
import { AnimatedDownArrowComponent } from "./components/animated-down-arrow/animated-down-arrow.component";
import { AboutRoutingModule } from "./about-routing.module";
import { AboutComponent } from "./about.component";

import { LottieModule } from "ngx-lottie";
import player from "lottie-web";

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AboutMeComponent,
    CurrentJobComponent,
    AnimatedDownArrowComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedComponentsModule,

    LottieModule.forRoot({ player: playerFactory }),
  ],
})
export class AboutModule {}