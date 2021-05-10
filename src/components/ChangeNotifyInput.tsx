import React, { useState } from "react";
import { Input, InputProps } from "reactstrap";

export interface ChangeNotifyInputProps extends InputProps {
  onInputChanged: () => void;
}

const ChangeNotifyInput = (
  props: ChangeNotifyInputProps
): React.ReactElement => {
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const { onInputChanged, onChange, ...others } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        onInputChanged();
      }, 2000)
    );
    onChange && onChange(event);
  };

  return <Input onChange={handleChange} {...others} />;
};

export default ChangeNotifyInput;
