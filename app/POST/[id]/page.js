import "./page.css";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import Image from "next/image";

export default async function Post(props) {
  const db = (await connectDB).db("goods-magazine");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  console.log(result);
  return (
    <>
      <div className="post-whole-container">
        <div className="post-container">
          <div className="post-top-img-container">
            <Image
              src={`/${result.img}`}
              alt="post"
              fill
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
              }}
            ></Image>
          </div>

          <div className="post-title">
            <h5>{result.date}</h5>
            <h2>{result.title}</h2>
            <h4>{result.info}</h4>
          </div>
        </div>
      </div>
    </>
  );
}
