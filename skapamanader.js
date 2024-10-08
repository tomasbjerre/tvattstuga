const fs = require('fs')
const dayjs = require('dayjs')
var updateLocale = require('dayjs/plugin/updateLocale')
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    weekdays: [
      "Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"
    ],
    months: [
        "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli",
        "Augusti", "September", "Oktober", "November", "December"
      ]
  })

for (let year = 2024; year <= 2030; year++) {
    let latexDocument = `
    \\documentclass[a4paper]{article}
    \\usepackage[a4paper, total={7in}]{geometry}

    \\begin{document}
    \\pagenumbering{gobble} 
    `;

    for (let month = 1; month <= 12; month++) {
        let dayOfMonth = dayjs(`${year}-${month}-01`)
        const latexBefore = `
    \\begin{table}[ht!]
    \\vspace{-10em}%
    \\normalsize
    \\begin{tabular}{lllp{7cm}p{7cm}}
    \\textbf{${dayOfMonth.format('MMMM')}}           & \\multicolumn{2}{l}{\\textbf{${year}}}                  & \\textbf{Tvättstuga 1} & \\textbf{Tvättstuga 2} \\\\ \\hline    
    `

        latexDocument += latexBefore;
        while (dayOfMonth.month()+1 == month) {
            latexDocument += `
    \\multicolumn{1}{|l|}{${dayOfMonth.format('D')}} & \\multicolumn{1}{l|}{fm} & \\multicolumn{1}{l|}{${dayOfMonth.format('dddd')}} & \\multicolumn{1}{l|}{} & \\multicolumn{1}{l|}{} \\\\ \\hline
    \\multicolumn{1}{|l|}{${dayOfMonth.format('D')}} & \\multicolumn{1}{l|}{em} & \\multicolumn{1}{l|}{${dayOfMonth.format('dddd')}} & \\multicolumn{1}{l|}{} & \\multicolumn{1}{l|}{} \\\\ \\hline    
    `
            dayOfMonth = dayOfMonth.add(1, 'day')
        }
        latexDocument += `
        \\end{tabular}
        \\end{table}
        `
    }

    latexDocument += `
    \\end{document}
    `

    const filename = `manader/manad-${year}.tex`;
    console.log(filename)
    //console.log(latexDocument)
    fs.writeFileSync(filename, latexDocument)
}
