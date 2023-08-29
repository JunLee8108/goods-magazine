import "./searchModal.css";
import Link from "next/link";
import Image from "next/image";
// for commit
export default function SearchModal({
  closeModal,
  effectModal,
  searchResult,
  post,
}) {
  //
  let isLoading = false;
  let filteredPost;

  if (searchResult !== "") {
    isLoading = true;
    filteredPost = post.filter((p) =>
      p.title.replace(" ", "").toLowerCase().includes(searchResult)
    );
  } else {
    isLoading = false;
  }

  return (
    <>
      <div
        className={
          effectModal
            ? "search-modal-black-bg animated-black-bg"
            : "search-modal-black-bg animated-hide-black-bg"
        }
        onClick={(e) => {
          const target = document.querySelector(".search-modal-black-bg");
          if (target === e.target) {
            closeModal();
          }
        }}
      >
        <div
          className={
            effectModal
              ? "search-modal-content-container animated"
              : "search-modal-content-container animated-hide"
          }
        >
          {isLoading ? (
            <>
              <div className="search-modal-flex">
                {filteredPost.map((a, index) => {
                  return (
                    <div className="search-modal-box" key={index}>
                      <h4>{filteredPost[index].date}</h4>
                      <Link href={`/POST/${filteredPost[index]._id}`}>
                        <Image
                          src={`/${filteredPost[index].img}`}
                          alt="post"
                          width={400}
                          height={400}
                          onClick={() => {
                            closeModal();
                          }}
                        ></Image>
                      </Link>
                      <h3>{filteredPost[index].title}</h3>
                      <div className="search-modal-box-info">
                        <h4>{filteredPost[index].info}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
