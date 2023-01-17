import Head from "next/head";
import { Oswald, Pacifico, Roboto } from "@next/font/google";
import Image from "next/image";
import { getSponsorshipList } from "@/libs/sheets";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

import dao from "@/assets/dao.png"
import mai from "@/assets/mai.png"

const oswald = Oswald({ subsets: ["latin-ext", "vietnamese", "latin"] });
const pacifico = Pacifico({
  subsets: ["latin", "vietnamese"],
  weight: "400",
});
const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "700", "900"],
});

const STEP = 1;
const TIME = null;
const TIME_REFRESH_DATA = 5 * 60 * 1000;

function* scroll(index: number) {
  while (index < document.body.scrollHeight) {
    window.scrollTo(0, index);
    yield index;
    if (index + STEP >= (document.body.scrollHeight - window.innerHeight + STEP)) {
      index = 0;
      window.location.reload();
    } else {
      index += STEP;
    }
  }
}

export default function Home({ sponsorshipList, date }: any) {
  const list = sponsorshipList.slice(1, sponsorshipList.length);
  const total = sponsorshipList[0].total;
  const [iterator] = useState(scroll(0));

  useInterval(() => {
    iterator.next()
  }, TIME)

  useInterval(() => {
    window.location.reload();
  }, TIME_REFRESH_DATA)

  return (
    <>
      <Head>
        <title>
          QUỸ GIÚP ĐỠ CÁC HOÀN CẢNH ĐẶC BIỆT KHÓ KHĂN TRÊN ĐỊA BÀN XÃ XUÂN SƠN
          NAM
        </title>
        <meta
          name="description"
          content="QUỸ GIÚP ĐỠ CÁC HOÀN CẢNH ĐẶC BIỆT KHÓ KHĂN TRÊN ĐỊA BÀN XÃ XUÂN SƠN NAM"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center py-4">
        <div className="snowflake">❀</div>
        <div className="snowflake">❀</div>
        <div className="snowflake snowflake3">✿</div>
        <div className="snowflake snowflake2">✿</div>
        <div className="snowflake">❀</div>
        <div className="snowflake snowflake3">✿</div>
        <div className="snowflake">❀</div>
        <div className="snowflake snowflake2">✿</div>
        <div className="snowflake">❀</div>
        <div className="snowflake snowflake3">✿</div>
        <div className="snowflake">❀</div>
        <div className="snowflake snowflake3">✿</div>
        <Image
          src={mai}
          alt="mai"
          className="object-contain fixed left-0 z-20 w-[200px] md:w-[300px] xl:w-[417px]"
          // width={417}
          // height={279}
        />
        <Image
          src={dao}
          alt="dao"
          className="object-contain fixed right-0 z-20 w-[200px] md:w-[300px] xl:w-[417px]"
        />
        <div className={`${oswald.className} max-w-4xl flex-1`}>
          <div className="text-center text-blue-800 sticky top-0 z-10 bg-white">
            <div className="font-bold mb-4">
              <h2>UỶ BAN NHÂN DÂN XÃ XUÂN SƠN NAM</h2>
              <h2>BAN CHỈ ĐẠO ĐÓN TẾT</h2>
            </div>
            <div
              className={`${pacifico.className} mb-4 capitalize leading-normal text-rose-500 text-2xl md:text-4xl`}
            >
              <h1>Văn Nghệ</h1>
              <h2>Mừng đảng mừng xuân quý mão 2023</h2>
            </div>
            <div>
              <h2 className="font-bold leading-normal text-blue-800 text-xl md:text-2xl xl:text-3xl hidden md:block">
                GÂY QUỸ GIÚP ĐỠ CÁC HOÀN CẢNH ĐẶC BIỆT KHÓ KHĂN
                <br />
                TRÊN ĐỊA BÀN XÃ XUÂN SƠN NAM
              </h2>
              <h2 className="font-bold leading-normal text-blue-800 text-xl md:text-2xl xl:text-3xl md:hidden">
                GÂY QUỸ GIÚP ĐỠ CÁC HOÀN CẢNH ĐẶC BIỆT KHÓ KHĂN TRÊN ĐỊA BÀN XÃ XUÂN SƠN NAM
              </h2>
            </div>
            <h3 className="mb-6">Xuân Sơn Nam, ngày 17 tháng 01 năm 2023</h3>
            <p style={roboto.style} className="ml-2 text-left text-black">
              Tổng số tiền quyên góp (cập nhật lúc {date}
              ):
            </p>
            <h2 className="font-bold text-yellow-600 mb-4 text-3xl md:text-4xl xl:text-5xl">{total}</h2>

            <p style={roboto.style} className="mb-4 ml-2 text-left text-black">
              Chân thành cảm ơn các mạnh thường quân:
            </p>

            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky">
                <tr>
                  <th scope="col" className="px-6 py-3 w-[300px]">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Địa chỉ
                  </th>
                  <th scope="col" className="px-6 py-3 text-right w-[150px]">
                    Số tiền
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className={roboto.className}>
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <tbody>
                    {list.map((data: any, i: number) => (
                      <tr
                        key={data.name}
                        className={`${
                          i % 2 ? "bg-yellow-50" : "bg-red-50"
                        } border-b`}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-bold text-gray-900 text-base w-[300px]"
                        >
                          {data.name || '-'}
                        </th>
                        <td className="px-6 py-4 text-base">{data.address || '-'}</td>
                        <td className="px-6 py-4 text-base font-extrabold text-right w-[150px]">
                          {data.sponsorship || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const sponsorshipList = await getSponsorshipList();
  return {
    props: {
      sponsorshipList, //.slice(1, emojis.length), // remove sheet header
      date: new Date().toLocaleString(),
    },
    revalidate: 1, // In seconds
  };
}
