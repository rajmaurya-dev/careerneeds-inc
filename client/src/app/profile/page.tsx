"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header";
import { useAuth } from "@clerk/nextjs";
import { profile } from "console";
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconLink,
  IconLocation,
} from "@tabler/icons-react";

const Page = () => {
  const { userId } = useAuth();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setUserData] = useState<any>({
    avatar_url: "",
    name: "",
    hireable: false,
    email: "",
    bio: "",
    location: "",
    followers: 0,
    following: 0,
    public_repos: 0,
    blog: "",
    twitter_username: "",
    html_url: "",
  });

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/getGithubData`, {
        username: username,
      });
      const data = response.data;
      setUserData({
        avatar_url: data.avatar_url,
        name: data.name,
        hireable: data.hireable || false,
        bio: data.bio || "",
        location: data.location || "",
        followers: data.followers || 0,
        following: data.following || 0,
        public_repos: data.public_repos || 0,
        blog: data.blog || "",
        twitter_username: data.twitter_username || "",
        html_url: data.html_url || "",
        email: data.email || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    getUser();
  };

  const handleSave = async () => {
    try {
      const dataObj = { username: username, userId: userId, data: data };
      const response = await axios.post(`/api/saveGithubData`, {
        data: dataObj,
      });
    } catch (error) {
      console.error("Error saving user data:", error);
    } finally {
      setLoading(false);
      getdata();
    }
  };

  const [twitter, setTwitter] = useState("");
  const handleTwitter = () => {
    setUserData((prev: any) => ({
      ...prev,
      twitter_username: twitter,
    }));
  };

  const [blog, setblog] = useState("");
  const handleBlog = () => {
    setUserData((prev: any) => ({
      ...prev,
      blog: blog,
    }));
  };

  const [bio, setBio] = useState("");
  const handleBio = () => {
    setUserData((prev: any) => ({
      ...prev,
      bio: bio,
    }));
  };

  const getdata = async () => {
    try {
      const response = await axios.get("/api/getUserData");
      setProfileData(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [ProfileData, setProfileData] = useState<any>();
  useEffect(() => {
    getdata();
  }, []);
  console.log(ProfileData);
  return (
    <div className="">
      <Header />

      {ProfileData ? (
         <div className="w-full  overflow-hidden dark:bg-black flex-col  bg-gray-700  dark:bg-grid-gray-500/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
         <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
 
        <div className="flex flex-col   text-white h-[100vh] overflow-hidden items-center justify-center p-8  shadow-lg rounded-lg">
          <img
            src={ProfileData.Image}
            alt={ProfileData.name}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className=" green_gradient text-2xl font-bold mb-2">{ProfileData.name}</h2>
          <p className=" text-gray-400 mb-4">{ProfileData.bio}</p>

          <div className="gap-4 text-gray-200">
            <div className="flex flex-col justify-center items-center">
              <div className="flex gap-20 w-[50vh] justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-3xl text-orange-400">
                    {ProfileData.followers}
                  </h1>
                  <p className="text-gray-400">Followers</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-3xl text-orange-400">
                    {ProfileData.following}
                  </h1>
                  <p className="text-gray-400">Following</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-3xl text-orange-400">
                    {" "}
                    {ProfileData.public_repos}
                  </h1>
                  <p className="text-gray-400">Public Repos</p>
                </div>
              </div>
              <p className="p-3 border-2 flex gap-2 items-center hover:bg-slate-900 hover:border-blue-200 rounded-lg justify-center w-60 mt-10 border-blue-900 ">
                {ProfileData.location}
                <IconLocation />
              </p>
              <a
                className="p-3 border-2 flex gap-2 items-center hover:bg-slate-900 hover:border-blue-200 rounded-lg justify-center  w-60 mt-4 border-blue-900 "
                href={ProfileData.github}
                target="_blank"
              >
                {" "}
                GitHub <IconBrandGithub />{" "}
              </a>{" "}
              <a
                className="p-3 border-2 gap-2 flex items-center hover:bg-slate-900 hover:border-blue-200 rounded-lg justify-center w-60 mt-4 border-blue-900 "
                href={ProfileData.blog}
              >
                Blog <IconLink />
              </a>
              <a
                className="p-3 border-2 hover:cursor-pointer hover:bg-slate-900 hover:border-blue-200 rounded-lg gap-2 flex justify-center items-center text-center w-60 mt-4 border-blue-900 "
                href={ProfileData.twitter}
              >
                Twitter
                <IconBrandTwitter />
              </a>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <div className=" bg-black flex flex-col justify-center items-center h-[100vh]">
          <h1 className="text-white orange_gradient text-center text-6xl ">
            Create your Profile
          </h1>
          {loading ? (
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-400">
              {" "}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                className=" bg-gray-200 border-2 text-lg text-center border-gray-500 h-10 mt-5 p-2 text-gray-900 rounded-md"
                type="text"
                placeholder="Enter your Github Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button type="submit"></button>
            </form>
          )}
          {data.name ? (
            <div className="flex border-2 border-gray-800 p-10 m-10 flex-col justify-center items-center">
              <img
                className="rounded-full mb-4"
                alt="hello"
                width="100"
                height="100"
                src={data.avatar_url}
              />
              <div className="text-center">
                <p className="text-2xl text-gray-300 font-semibold ">
                  {data.name}{" "}
                  <button className="border-2 border-gray-900 bg-gray-900 px-2 py-1 text-gray-200">
                    {data.hireable ? " [Hirable] " : ""}
                  </button>
                </p>
                <p className="text-lg text-blue-500 font-semibold">
                  {data.email}
                </p>
                {data.bio ? (
                  <p className="text-lg text-green-500 font-semibold">
                    {data.bio}
                  </p>
                ) : (
                  <>
                    <form onSubmit={handleBio}>
                      <input
                        className=" bg-gray-200 border-2 text-lg text-center border-gray-500 h-10 mt-5 p-2 text-gray-900 rounded-md"
                        type="text"
                        placeholder="bio?"
                        onChange={(e) => setBio(e.target.value)}
                      />
                      <button type="submit"></button>
                    </form>
                  </>
                )}
                <p className="text-lg text-orange-500 font-semibold">
                  {data.location}{" "}
                </p>
                <p className="text-lg text-gray-500 font-semibold">
                  {data.followers} Followers, {data.following} Following
                </p>
                <p className="text-lg text-gray-500 font-semibold">
                  {data.public_repos} Repositories
                </p>{" "}
                {data.blog ? (
                  <a
                    href={data.blog}
                    className="text-lg text-blue-500 underline font-semibold"
                  >
                    {data.blog}
                  </a>
                ) : (
                  <>
                    <form onSubmit={handleBlog}>
                      <input
                        className=" bg-gray-200 border-2 text-lg text-center border-gray-500 h-10 mt-5 p-2 text-gray-900 rounded-md"
                        type="text"
                        placeholder="blog?"
                        onChange={(e) => setblog(e.target.value)}
                      />
                      <button type="submit"></button>
                    </form>
                  </>
                )}{" "}
                {data.twitter_username ? (
                  <p className="text-lg text-gray-500 font-semibold">
                    {data.twitter_username}
                  </p>
                ) : (
                  <>
                    <form onSubmit={handleTwitter}>
                      <input
                        className=" bg-gray-200 border-2 text-lg text-center border-gray-500 h-10 mt-5 p-2 text-gray-900 rounded-md"
                        type="text"
                        placeholder="twitter?"
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                      <button type="submit"></button>
                    </form>
                  </>
                )}
                <a
                  className="text-lg font-semibold text-green-600 underline"
                  href={data.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </div>
              <button
                onClick={handleSave}
                className="text-white border-2 px-2  text-2xl py-1 "
              >
                Save
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
