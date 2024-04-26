import {useEffect, useState} from "react";
import {get} from "../../clients/HttpClient";
import {APP_PROPS} from "../../constants/AppConstants";

function useFetchCatalogItems() {
    const [data, setData] = useState();

    useEffect(() => {
        const getCatalogItems = async () => {
            try {
                const apiUrl = `${APP_PROPS.bookstoreUrl}/catalogItems`;
                const response = await get(apiUrl, onSuccess, onError);
                if (response && response.data) {
                    setData(response.data);
                } else {
                    console.error("Error: No data received from API");
                }
            } catch (error) {
                console.error("Error occurred during fetching catalogItems", error);
            }

        };
        getCatalogItems();
        const onError = (error) => {
            console.error("Login error:", error);
        };
        const onSuccess = (response) => {
            console.error("Success", response);
        };
    }, []);

    return data;
}

export default useFetchCatalogItems;
