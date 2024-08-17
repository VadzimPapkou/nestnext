import Image from "next/image";
import "@/config";
import {Navbar} from "@/components/Navbar";
import {GoodDeeds} from "@/components/GoodDeeds";

export default function Home() {
    return (
        <main>
            <GoodDeeds/>
        </main>
    );
}
