import { Loading } from "@/components/Loading";
import { MovieList } from "@/components/MovieList";
import RateForm from "@/components/RateForm";
import { Reviews } from "@/components/Reviews";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div
        className="flex mx-auto relative flex-col  justify-end
       w-full
       lg:w-9/12
       h-[calc(100vh-5rem)]
       bg-cover
       bg-scroll
       bg-center background-home
       bg-[url(https://a.ltrbxd.com/resized/sm/upload/mm/bt/iu/mk/fRyYKQdsXIjw26MendWxpWmvnBs-1200-1200-675-675-crop-000000.jpg?v=0036da8577)]"
      >
        <div className="w-full bg-[] z-10">
          <div className="mx-auto py-4 mt-4 px-20 md:max-w-2xl text-center">
            <h3 className="text-3xl font-bold ">
              Track films you’ve watched. Save those you want to see. Tell your
              friends what’s good.{" "}
            </h3>
            <Link
              href={"/register"}
              className="py-1 px-6  mx-auto mt-4 text-center rounded hover:bg-blue-700 transition-colors bg-blue-800 uppercase inline-block "
            >
              Get started!
            </Link>
          </div>
        </div>
      </div>

      <section className="h-[calc(50vh-5rem)]">Trending Movies</section>

      <section className="min-h-[calc(50vh-5rem)]">
        <h2>Last reviews</h2>
        <Reviews />
      </section>

      <section className="h-[calc(50vh-5rem)]">
        POPULAR REVIEWS THIS WEEK
      </section>
    </div>
  );
}
