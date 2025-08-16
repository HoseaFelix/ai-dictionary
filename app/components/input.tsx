"use client";

import { generateDefiniiton } from "@/constants/constant";
import { useErrorStore, useWordStore } from "@/store/store";
import Image from "next/image";
import React, { useState } from "react";

const Input = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const setLinkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      useErrorStore.getState().setError("Still loading... please wait");
      return;
    }

   

    try {
      useWordStore.getState().setWord(link.trim())
      setLoading(true);
      setLink("loading...");
      await generateDefiniiton(link.trim());
    } catch (error) {
      console.error(error);
      useErrorStore
        .getState()
        .setError("Error generating Definition. Try again later.");
    } finally {
      setLoading(false);
      setLink(""); // ✅ Clear the input after loading
    }
  };

  return (
    <div className="flex flex-row h-20 bg-white/50 backdrop:saturate-150 rounded-4xl shadow-light-800 shadow-sm mx-auto w-[80%] absolute-center">
      <div className="h-full w-full p-5">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center justify-center"
        >
          <input
            disabled={loading} // ✅ disable input while loading
            onChange={setLinkInput}
            value={link}
            type="text"
            placeholder={loading ? "Generating..." : "Enter word"}
            className="w-[95%] outline-none shadow-none text-black backdrop:saturate-150 disabled:cursor-not-allowed "
          />

          <button
            type="submit"
            disabled={loading} // ✅ disable button while loading
            className="bg-black rounded-full w-[40px] h-[40px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              width={30}
              height={30}
              src="/arrow-up.svg"
              alt="arrow"
              className="filter invert"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Input;
