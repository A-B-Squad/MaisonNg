import { CiDeliveryTruck } from "react-icons/ci";
import { GrMoney } from "react-icons/gr";
import { MdOutlineSupportAgent } from "react-icons/md";

const Services = () => {
  return (
    <section className="mt-10 border p-5 hidden lg:block bg-white">
      <ul className="flex justify-center gap-20">
        <li className="flex justify-center items-center gap-3 pr-4 border-r-2">
          <CiDeliveryTruck className="text-primaryColor text-[4rem]" />
          <div>
            <h3 className="font-bold ">LIVRAISON GRATUITE</h3>
            <h4>À partir de 499 TND</h4>
          </div>
        </li>
        <li className="flex justify-center items-center  gap-3 pr-4 border-r-2">
          <MdOutlineSupportAgent className="text-primaryColor text-[4rem]" />
          <div>
            <h3 className="font-bold">ASSISTANCE 24h/7</h3>
            <h4>En ligne 24 heures</h4>
          </div>
        </li>
        <li className="flex justify-center items-center gap-3 pr-4 ">
          <GrMoney className="text-primaryColor text-[4rem]" />
          <div>
            <h3 className="font-bold">GRANDE ÉCONOMIE</h3>
            <h4>Ventes du week-end</h4>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Services;
