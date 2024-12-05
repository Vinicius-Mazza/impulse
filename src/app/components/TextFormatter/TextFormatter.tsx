import React, { useState } from "react";
import { Text, Show, Link } from "@chakra-ui/react";
import TruncateMarkup from "react-truncate-markup";
import { Avatar } from "@/components/ui/avatar";
import { useFetchData } from "@/hooks";
import { User } from "@/interfaces";
import { HoverCardUser } from "@/components";

export const TextFormatter: React.FC<{ text: string; fontSize?: string }> = ({
  text,
  fontSize = "md",
}) => {
  const urlApiUsers = "http://localhost:3001/users";
  const { data: users } = useFetchData<User[]>(urlApiUsers);
  const [isTruncated, setIsTruncated] = useState(true);

  interface Element {
    type: string;
    value: string;
  }

  const renderMention = (username: string) => {
    const user = (users || []).find((user) => user.username === username);
    return (
      <span key={username}>
        <TruncateMarkup.Atom key={username}>
          <Show when={user} fallback={`@${username}`}>
            <>
              <Avatar
                size="2xs"
                name={`${user?.firstname ?? ""} ${user?.lastname ?? ""}`}
                src={user?.avatar ?? ""}
              />
              &nbsp;
              {user && <HoverCardUser user={user} hoverTrigger="mention" />}
            </>
          </Show>
        </TruncateMarkup.Atom>
      </span>
    );
  };

  const renderUrl = (url: string) => {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        colorPalette="blue"
        key={url}
      >
        {url}
      </Link>
    );
  };

  const renderHashtag = (hashtag: string) => {
    return (
      <Link href={`/search?query=${hashtag}`} colorPalette="blue" key={hashtag}>
        #{hashtag}
      </Link>
    );
  };

  const renderFormattedText = (text: string) => {
    const regexes = [
      { type: "mention", regex: /@(\w+)/g },
      {
        type: "url",
        regex:
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)+(?:[/?#][^\s]*)?)/gi,
      },
      { type: "hashtag", regex: /#(\w+)/g },
    ];

    const renderers = [
      { type: "mention", render: renderMention },
      { type: "url", render: renderUrl },
      { type: "hashtag", render: renderHashtag },
    ];

    const elements: Element[] = [];
    let lastIndex = 0;

    regexes.forEach(({ type, regex }) => {
      let match;
      while ((match = regex.exec(text)) !== null) {
        elements.push({
          type: "text",
          value: text.substring(lastIndex, match.index),
        });
        elements.push({ type: type, value: match[1] });
        lastIndex = match.index + match[0].length;
      }
    });

    if (lastIndex < text.length) {
      elements.push({ type: "text", value: text.substring(lastIndex) });
    }

    return (
      <Text as="div">
        {elements.map((element) => {
          const renderer = renderers.find((r) => r.type === element.type);
          return renderer ? renderer.render(element.value) : element.value;
        })}
      </Text>
    );
  };

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const readMoreEllipsis = (
    <span>
      ...
      <br />
      <Link color="#8f8f8f" onClick={toggleTruncate}>
        Ver mais
      </Link>
    </span>
  );

  return (
    <div>
      <Show
        when={isTruncated}
        fallback={
          <Text
            as="div"
            whiteSpace="pre-wrap"
            fontSize={fontSize}
            lineHeight="1.6"
            mb={5}
            fontWeight="500"
            width="100%"
          >
            {renderFormattedText(text)}
            <br />
            <Link color="#8f8f8f" onClick={toggleTruncate}>
              Ver menos
            </Link>
          </Text>
        }
      >
        <TruncateMarkup lines={5} ellipsis={readMoreEllipsis}>
          <Text
            as="div"
            whiteSpace="pre-wrap"
            fontSize={fontSize} //here
            lineHeight="1.6"
            mb={5}
            fontWeight="500"
            width="100%"
          >
            {renderFormattedText(text)}
          </Text>
        </TruncateMarkup>
      </Show>
    </div>
  );
};
