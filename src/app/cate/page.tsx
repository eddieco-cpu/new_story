import {Category, Categories} from "@/types/cate";

import randomPicture from "@utils/randomPicture";
import randomText from "@utils/randomText";

import CategoriesList from "./components/CategoriesList";
import Line from "@/components/Try/Line";

import { UiTitle, UiSection } from "@/components/UI";
import PageNameInDev from "@/components/UI/PageNameInDev";


const categories: Categories = [
  {
    id: "original",
    name: "琅琅原創",
    url: "",
    isEmphasis: true,
  },
  {
    id: "romance",
    name: "言情",
    url: "",
    isEmphasis: false,
  },
  {
    id: "lightNovel",
    name: "輕小說",
    url: "",
    isEmphasis: false,
  },
  {
    id: "fantasy",
    name: "玄幻",
    url: "",
    isEmphasis: false,
  },
  {
    id: "suspense",
    name: "懸疑",
    url: "",
    isEmphasis: false,
  },
  {
    id: "adventure",
    name: "冒險",
    url: "",
    isEmphasis: false,
  },
  {
    id: "supernatural",
    name: "靈異",
    url: "",
    isEmphasis: false,
  },
  {
    id: "BL",
    name: "BL",
    url: "",
    isEmphasis: false,
  },
  {
    id: "adult",
    name: "18+",
    url: "",
    isEmphasis: false,
  },
  {
    id: "comic",
    name: "漫畫",
    url: "",
    isEmphasis: true,
  },
  {
    id: "manga",
    name: "漫畫",
    url: "",
    isEmphasis: false,
  },
]

const photos = Array.from({ length: 6 }, (_, i) => i + 1).map((i) => `https://picsum.photos/200/300?random=${i}`);

export default function Cate() {
  return (
    <section>

      <section>
        <picture className='block w-full aspect-video overflow-hidden h-[330px]'>
          <img src={randomPicture()} alt="" className='block w-full h-full object-cover object-center' />
        </picture>
      </section>

      <section className=" px-6 py-5">
        <article className=" flex justify-start items-center gap-2 ">
          <span className=" block w-[70px] h-[30px] rounded-2xl rounded-l-md bg-secondary-450 text-white flex justify-center items-center">
            News
          </span>
          <div>
            <p className=" text-lg text-ash-850">{randomText(15, 50)}</p>
          </div>
        </article>
      </section>

      <section className=" py-4 px-6">
        <CategoriesList categories={categories} />
      </section>

      <section >
       <section className="px-6 mb-2">
        <UiTitle titleLink="/cate">言情</UiTitle>
       </section>
       <section className=" rounded-2xl overflow-hidden grid grid-flow-col gap-7 bg-landscape-400">
          <article className="py-4 px-6 ">
          </article>
          <p>666</p>
       </section>
      </section>

      <div className="scrollbar-hide w-[700px]">
        <ul className=" flex justify-start items-center gap-2 scrollbar-hide w-[700px]">
          {
            photos.map((photo, index) => (
              <li key={index}>
                <picture className="pic-base w-80 aspect-square">
                  <img src={photo} alt="" />
                </picture>
              </li>
            ))
          }
        </ul>
      </div>

      <UiSection titleChildren="最近大家看什麼" titleLink="/cate">
        最近大家看什麼
      </UiSection>
      

      <PageNameInDev>cate</PageNameInDev>
    </section>
  );
}
