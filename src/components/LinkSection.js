import React from 'react';

export function Links({ link_sections: linkSections }) {
  return (
    <div id="home">
      {linkSections.map((section, linkSectionKey) => {
        return (
          <section className={section.class} key={linkSectionKey}>
            <h1>{section.header}</h1>
            <table>
              <tbody>
                {section.links.map((l, key) => {
                  return (
                    <tr key={key}>
                      <td className={section.title_class}>{l.title}</td>
                      <td className={section.href_class}>
                        <a
                          href={l.href}
                          onClick={(event) => {
                            event.preventDefault();
                            window.open(l.href);
                          }}
                        >
                          {l.href_title}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
}
