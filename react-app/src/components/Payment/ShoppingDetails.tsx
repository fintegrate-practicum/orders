import React, { useEffect, useState } from 'react'
const ShoppingDetails = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedOption(e.target.value);
    };
    const [selectedShippingOption, setSelectedShippingOption] = useState('');

    const handleShippingOption = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedShippingOption(e.target.value);
    };

    const [countries, setCountries] = useState<{ code: string, name: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [cities, setCities] = useState<{ id: number, name: string }[]>([]);
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://api.example.com/countries');
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries: ', error);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryChange = (e: any) => {
        const country = e.target.value;
        setSelectedCountry(country);

        // Fetch cities data based on selected country
        fetch(`https://api.example.com/countries/${country}/cities`)
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.error('Error fetching cities:', error));
    };

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
    }

    return (
        <form>
            <div>
                <label>
                    <input
                        type="radio"
                        value="shipping"
                        checked={selectedOption === 'shipping'}
                        onChange={handleChange}
                    />
                    משלוח
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        value="selfCollection"
                        checked={selectedOption === 'selfCollection'}
                        onChange={handleChange}
                    />
                    איסוף עצמי
                </label>
                <br />
            </div>
            <br/>

            {selectedOption === 'shipping' && (
                <div>
                    <label>
                        <input
                            type="radio"
                            value="mail"
                            checked={selectedShippingOption === 'mail'}
                            onChange={handleShippingOption}
                        />
                        בדואר
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            value="deliveryPerson"
                            checked={selectedShippingOption === 'deliveryPerson'}
                            onChange={handleShippingOption}
                        />
                        שליח עד הבית
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            value="CollectingPoint"
                            checked={selectedShippingOption === 'CollectingPoint'}
                            onChange={handleShippingOption}
                        />
                        נקודת איסןף
                    </label>
                    <br />
                    <h3>כתובת יעד</h3>
                    <br />
                    <label>
                        <input
                            id="City"
                            type="text"
                        />
                        עיר
                    </label>
                    <br />
                    <label>
                        <input
                            id="Street"
                            type="text"
                        />
                        רחוב
                    </label>
                    <br />
                    <label>
                        <input
                            id="buildingNumber"
                            type="number"
                        />
                        מספר בנין
                    </label>
                    <br />
                    <label>
                        <input
                            id="floor"
                            type="number"
                        />
                        קומה
                    </label>
                    <br />
                    <label>
                        <input
                            id="houseNumber"
                            type="number"
                        />
                        מספר בית
                    </label>
                    <br />
                    <label>
                        <input
                            id="Last Name"
                            type="text"
                        />
                        משפחה
                    </label>
                    <br />
                </div>
            )}
        </form>
    );
}

export default ShoppingDetails;

