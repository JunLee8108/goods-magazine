import "./page.css";
import { connectDB } from "@/util/database";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("goods-magazine");
  const result = await db.collection("post").find().toArray();

  return (
    <>
      <div className="home-middle-img-flex">
        <div className="home-middle-img-box"></div>
      </div>

      <div className="home-bottom-post-title">
        <center>
          <h2>Recent Posts</h2>
        </center>
      </div>

      <div className="home-bottom-post-flex">
        {result.map(function (a, index) {
          return (
            <div className="home-bottom-post-box" key={index}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "300px",
                }}
              >
                <Link href={`/POST/${result[index]._id.toJSON()}`}>
                  <Image
                    src={`/${result[index].img}`}
                    alt="post"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  ></Image>
                  {/* <img src={result[index].img}></img> */}
                </Link>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h5 style={{ color: "grey" }}>{result[index].date}</h5>
                <h3 style={{ marginTop: "0" }}>{result[index].title}</h3>
                <div className="home-bottom-post-box-info">
                  <h4>{result[index].info}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
