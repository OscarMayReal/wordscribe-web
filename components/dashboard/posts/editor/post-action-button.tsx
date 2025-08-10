import { ReactNode } from "react";

interface PostActionButtonProps {
  onClick: () => void;
  Icon: React.ComponentType<{ size: number }>;
  text: string;
  children?: ReactNode;
}

export function PostActionButton({ onClick, Icon, text, children }: PostActionButtonProps) {
  return (
    <div 
      className="postactionbutton" 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'background-color 0.2s',
      }}
    >
      <Icon size={20} />
      <div>{text}</div>
      {children}
    </div>
  );
}
