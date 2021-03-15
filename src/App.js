import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {View, Text} from 'react-native';
import Autolink from 'react-native-autolink';
import reactStringReplace from 'react-string-replace';

const Src = () => {
  const [description, setDescription] = useState(
    '<p>Veja muito mais aqui<br>\n00:00 abertura<br>\n 00:10 dica principal<br>\n00:15 o final do episódio</p>\n<p>saiba mais em <a href="https://google.com/" rel="noopener noreferrer" target="_blank">https://google.com</a> e siga nossas redes sociais em @google ou mande um email para <a href="mailto:contato@google.com" rel="noopener noreferrer" target="_blank">contato@google.com</a> e fale conosco</p>',
  );
  const regex = /(<([^>]+)>)/gi;

  const content_snippet = useMemo(() => description.replace(regex, ''), [
    description,
    regex,
  ]);

  const replaceTime = useCallback(
    (op) => {
      return reactStringReplace(content_snippet, op, (match, i) => (
        <Text onPress={() => alert('Deu certo')} style={{color: '#f00'}}>
          {op}
        </Text>
      ));
    },
    [content_snippet],
  );

  const funcText = useCallback(
    (text) => {
      text.match(/[0-5]\d+:[0-5]\d+/gm).map((element, index, array) => {
        return replaceTime(element);
      });
    },
    [replaceTime],
  );
  return (
    <View style={{alignItems: 'center', flex: 1, backgroundColor: '#333'}}>
      <Autolink
        text={content_snippet}
        linkStyle={{color: '#49D5F8'}}
        component={Text}
        renderText={(text, i) => funcText(text)}
      />
    </View>
  );
};

export default Src;
