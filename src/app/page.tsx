import Image from "next/image";

// ui component
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <h1 className="heading-1">Hello</h1>
      <h1 className="heading-2">Hello</h1>
      <h1 className="heading-3">Hello</h1>
      <Button variant={"primaryBtn"} size={"primaryBtn"}>Downloads for windows</Button>
      <Button variant={"secondaryBtn"} size={"primaryBtn"}>Downloads for windows</Button>
      <Button variant={"loginBtn"} size={"loginBtn"}>Login</Button>
      <Button variant={"blueBtn"} size={"primaryBtn"}>Hello Login here</Button>


    </>

  );
}
