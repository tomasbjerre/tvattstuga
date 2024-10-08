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
  var weekOfYear = require("dayjs/plugin/weekOfYear");
  dayjs.extend(weekOfYear);
  
let now = dayjs("2024-10-07")
for (let i = 0; i < 52*100; i++) {
    let vecka = now.week()
    console.log(`Week number: ${vecka}`)
    let year = now.format('YYYY')
    console.log(`year: ${year}`)
    let month = now.format('MMMM')
    console.log(`month: ${month}`)

    let to = now.add(6,'days')
    let latexDocument = `
    \\documentclass[a4paper]{article}
    \\usepackage[a4paper, total={8in, 11in}]{geometry}

    \\begin{document}
    \\pagenumbering{gobble} 

    \\textbf{\\Huge Vecka ${vecka}, ${now.format('YYYY')}-${now.format('MM')}-${now.format('DD')} till ${to.format('YYYY')}-${to.format('MM')}-${to.format('DD')}} \\

    \\renewcommand{\\arraystretch}{4}
    \\begin{table}[ht!]
    \\normalsize
    \\begin{tabular}{lllp{5cm}p{5cm}}
    \\textbf{\\Huge Pass och dag} & \\textbf{\\Huge Tvättstuga 1} & \\textbf{\\Huge Tvättstuga 2} \\\\ \\hline    
    `

    for (let d =0;d < 7;d++) {
      let day = now.format('D')
      console.log(`day: ${day}`)
      let dagensNamn = now.format('dddd')
      console.log(`dagens namn: ${dagensNamn}`)

      latexDocument += `
      \\multicolumn{1}{|l|}{\\Huge \\textbf{${dagensNamn} förmiddag}}   & \\multicolumn{1}{l|}{} & \\multicolumn{1}{l|}{} \\\\ \\hline
      \\multicolumn{1}{|l|}{\\Huge \\textbf{${dagensNamn} eftermiddag}} & \\multicolumn{1}{l|}{} & \\multicolumn{1}{l|}{} \\\\ \\hline    
      `

      now = now.add(1,"days")
    }
    latexDocument += `
    \\end{tabular}
    \\end{table}
    `

    latexDocument += `
    \\end{document}
    `

    try {
      fs.mkdirSync(`veckor/${year}`)
    } catch {}
    const filename = `veckor/${year}/vecka-${vecka}.tex`;
    console.log(filename)
    try {
      fs.mkdirSync(`veckor/${year}`)
    } catch {}
    fs.writeFileSync(filename, latexDocument)
}