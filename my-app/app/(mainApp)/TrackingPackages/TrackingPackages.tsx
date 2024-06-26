"use client";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  GET_PACKAGES_BY_ID,
  GET_PACKAGES_BY_USER_ID,
} from "../../../graphql/queries";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "./loading";
import moment from "moment-timezone";
import "moment/locale/fr";

interface Product {
  product: any;
  name: ReactNode;
  productId: string;
}
interface Checkout {
  [x: string]: any;
  products: Product[];
}

interface Package {
  id: string;
  Checkout: Checkout;
  status: string;
  createdAt: string;
}

interface DecodedToken extends JwtPayload {
  userId: string;
}

const TrackingPackages: React.FC = () => {
  // State to manage search input value
  const [searchInput, setSearchInput] = useState("");
  // State to store fetched packages
  const [packages, setPackages] = useState<Package[]>([]);
  // State to store decoded token
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  // State to track if a search has been performed
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Effect to decode the token from cookies and set the decoded token state
  useEffect(() => {
    const token = Cookies.get("Token");
    if (token) {
      const decoded = jwt.decode(token) as DecodedToken;
      setDecodedToken(decoded);
    }
  }, []);

  // Lazy query to fetch user packages by user ID
  const [userPackages] = useLazyQuery(GET_PACKAGES_BY_USER_ID);

  // Query to fetch package by ID based on search input
  const { loading: loadingPackageById, data: packageById } = useQuery(
    GET_PACKAGES_BY_ID,
    {
      variables: { packageId: searchInput },
      skip: !searchInput,
    }
  );

  // Effect to fetch user packages if no search has been performed and user is authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (decodedToken?.userId) {
        try {
          const { data } = await userPackages({
            variables: { userId: decodedToken.userId },
          });

          // Check if data and packageByUserId exist before setting packages
          if (data && data.packageByUserId) {
            setPackages(data.packageByUserId);
          }
        } catch (error) {
          console.error("Error fetching user packages:", error);
        }
      }
    };

    // Fetch data if no search has been performed and user is authenticated
    if (!searchPerformed && decodedToken?.userId) {
      fetchData();
    }
  }, [userPackages, searchPerformed, decodedToken?.userId]);

  // Effect to update packages when a package is found by ID
  useEffect(() => {
    if (searchInput.length && packageById) {
      setPackages([packageById.packageById]);
      setSearchPerformed(true);
    }
  }, [packageById, searchInput]);

  // Handle input change and reset search performed state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearchPerformed(false);
  };

  // Type for status translations
  type Status =
    | "EN ATTENTE"
    | "RETOUR"
    | "ÉCHANGE"
    | "TRANSFÉRÉ À LA SOCIÉTÉ DE LIVRAISON"
    | "EN TRAITEMENT"
    | "PAYÉ";

  // Function to translate status from English to French
  const translateStatus = useCallback((status: string): Status => {
    const statusTranslations: { [key: string]: Status } = {
      PENDING: "EN ATTENTE",
      BACK: "RETOUR",
      EXCHANGE: "ÉCHANGE",
      TRANSFER_TO_DELIVERY_COMPANY: "TRANSFÉRÉ À LA SOCIÉTÉ DE LIVRAISON",
      PROCESSING: "EN TRAITEMENT",
      PAYED: "PAYÉ",
    };
    return statusTranslations[status] || status;
  }, []);

  // Mapping status to corresponding background color
  const statusColors: Record<Status, string> = {
    "EN ATTENTE": "bg-yellow-400",
    RETOUR: "bg-blue-400",
    ÉCHANGE: "bg-purple-400",
    "TRANSFÉRÉ À LA SOCIÉTÉ DE LIVRAISON": "bg-green-400",
    "EN TRAITEMENT": "bg-orange-400",
    PAYÉ: "bg-green-400",
  };

  // Function to get the background color based on status
  const getStatusColor = (status: Status) => {
    return statusColors[status] || "bg-gray-400";
  };

  return (
    <div className="tracking-packages h-full pb-10">
      <div className="search-package border-b py-3 px-3 w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Recherchez votre colis avec Reference"
          value={searchInput}
          onChange={handleInputChange}
          className="search-input outline-none p-3 border-primaryColor w-96 px-5 border rounded"
        />
      </div>
      <div className="package-list py-3 px-3 h-full">
        {loadingPackageById ? (
          <Loading />
        ) : packages?.length > 0 ? (
          <Table className="border">
            <TableCaption>Liste de vos colis récents.</TableCaption>
            <TableHeader className="bg-[#cc8c70] text-white">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Créé le</TableHead>
                <TableHead>Produits</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white ">
              {packages.map((pkg) => (
                <TableRow key={pkg.id} className="relative">
                  <TableCell>{pkg.id}</TableCell>
                  <TableCell className="relative flex items-center">
                    <span
                      className={`${getStatusColor(translateStatus(pkg.status) as Status)} py-2 rounded-md px-5 text-center text-white`}
                    >
                      {translateStatus(pkg.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {moment(+pkg.createdAt).locale("fr").format("lll")}
                  </TableCell>
                  <TableCell>
                    <ul>
                      {pkg.Checkout.products.map((product, index) => {
                        return (
                          <li className="list-outside" key={index}>
                            {product?.product.name}
                          </li>
                        );
                      })}
                    </ul>
                  </TableCell>
                  <TableCell>{pkg?.Checkout?.total?.toFixed(3)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex items-center justify-center">
            <div className="border shadow-md p-3 w-4/5 py-5 bg-white text-center md:mt-36 h-36 md:h-fit flex items-center flex-col justify-center ">
              <p className="font-normal tracking-wider text-center text-gray-600">
                {!searchInput && packages.length === 0
                  ? "Bienvenue sur notre plateforme! Vous n'avez pas encore passé de commandes. Explorez nos produits et trouvez ce que vous aimez."
                  : "Nous n'avons trouvé aucun colis correspondant à cette référence. Veuillez vérifier votre saisie ou contactez-nous pour obtenir de l'aide."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPackages;
