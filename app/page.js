import "./page.css";
import { connectDB } from "@/util/database";

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
          <h2>Posts</h2>
        </center>
      </div>

      <div className="home-bottom-post-flex">
        {result.map(function (a, index) {
          return (
            <div className="home-bottom-post-box" key={index}>
              <h4>{result[index].date}</h4>
              <img src={result[index].img}></img>
              <h4>{result[index].title}</h4>
              <h4>{result[index].info}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
}
