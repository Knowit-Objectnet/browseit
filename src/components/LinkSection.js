import React from "react";
import "../App.css";

// const linkJsonStruct = Linkdata.link_sections;
export function Links(props) {
  const linkSections = props.link_sections;
  return (
    <div id="home">
      {linkSections.map((section, i) => {
        return (
          <section className={section.class} key={i}>
            <h1>{section.header}</h1>
            <table>
              <tbody>
                {section.links.map((l, i) => {
                  return (
                    <tr key={i}>
                      <td className={section.title_class}>{l.title}</td>
                      <td className={section.href_class}>
                        <a href={l.href}>{l.href_title}</a>
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
