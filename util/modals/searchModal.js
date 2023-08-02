import "./searchModal.css";

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
              {filteredPost.map((a, index) => {
                return <h3 key={index}>{filteredPost[index].title}</h3>;
              })}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
