"use client";

import Link from "next/link";
import "./navbar.css";
import SearchModal from "./modals/searchModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Navbar({ post }) {
  // Data
  const menu = [
    {
      name: "ARTICLE",
    },
    {
      name: "INTERVIEW",
    },
    {
      name: "AUDIO ARTICLE",
    },
    {
      name: "NEWS",
    },
    {
      name: "TODO",
    },
  ];

  // Search modal handler
  const [isModal, setModal] = useState(false);
  const [effectModal, setEffectModal] = useState(false);
  const [inputTarget, setInputTarget] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const inputHandler = (e) => {
    setEffectModal(true);
    setInputTarget(e.target);
    setSearchResult(e.target.value.replace(" ", "").toLowerCase());
    document.body.style.overflow = "hidden";
    if (e.target.value.length === 0) {
      closeModal();
    }
  };

  const closeModal = () => {
    setEffectModal(false);
    document.body.style.overflow = "unset";
    if (inputTarget !== "") {
      inputTarget.value = "";
    }
  };

  useEffect(() => {
    let timer;

    if (effectModal) {
      setModal(true);
    } else {
      timer = setTimeout(() => {
        setModal(false);
      }, 200);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [effectModal]);

  console.log(searchResult);

  return (
    <>
      <div className="navbar-top-flex">
        <div className="navbar-top-box">
          <h3>By Goods</h3>
        </div>

        <div className="navbar-top-box">
          <Link href="/" className="navbar-top-box-name">
            <h2 onClick={closeModal}>Goods Mazagine</h2>
          </Link>
        </div>

        <div className="navbar-top-box">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ marginRight: "5px" }}
          />
          <input
            type="text"
            placeholder="search.."
            onChange={(e) => {
              inputHandler(e);
            }}
          ></input>
        </div>

        {/* MOBILE */}
        <div className="navbar-top-box-mobile">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>

      <div className="sticky-container">
        <div className="navbar-menu-flex">
          {menu.map(function (a, index) {
            return (
              <div className="navbar-menu-box" key={index}>
                <Link href={menu[index].name}>
                  <button>{menu[index].name}</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {isModal ? (
        <SearchModal
          closeModal={closeModal}
          effectModal={effectModal}
          searchResult={searchResult}
          post={post}
        />
      ) : null}
    </>
  );
}
