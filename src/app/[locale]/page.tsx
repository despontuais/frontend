import { HomePage } from "@/components/home";
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
export default function Home() {
  return (
    <NextUIProvider>
      <HomePage>
      </HomePage>
    </NextUIProvider>
  );
}
