import "./globals.css";
import Navbar from "@/util/navbar";
import { connectDB } from "@/util/database";

import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
// library.add(fab, fas, far);

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

const client = await connectDB;
const db = client.db("goods-magazine");
const result = await db.collection("post").find().toArray();
const post = [...result];
for (let x = 0; x < post.length; x++) {
  post[x]._id = post[x]._id.toJSON();
}

export const metadata = {
  title: "Goods Magazine",
  description: "Magazine by Goods magazine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar post={post} />
        {children}
      </body>
    </html>
  );
}
