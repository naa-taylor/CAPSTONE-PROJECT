import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="flex flex-col">
      <label className="text-gray-600 text-sm mb-2">Phone Number</label>
      <PhoneInput
        country={"ca"} // Default to Canada
        value={phone}
        onChange={(phone) => setPhone(phone)}
        inputStyle={{
          width: "100%",
          height: "50px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          paddingLeft: "50px",
        }}
        buttonStyle={{
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default PhoneNumberInput;
