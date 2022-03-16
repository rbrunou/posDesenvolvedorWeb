function grafico(parametros) {
    let svg = d3
                .select(parametros.seletor)
                .attr('width', parametros.largura+'px')
                .attr('height', parametros.altura+'px');

    let larguraPlotagem = parametros.largura-40;
    let alturaPlotagem = parametros.altura-40;
    let plotagem = svg.append('g')
                      .attr('width', larguraPlotagem)
                      .attr('height', alturaPlotagem)
                      .attr('transform', 'translate(20,20)')


    let fnX = d3
                .scaleBand()
                .domain(parametros.dados.map(d=>d.chave))
                .range([0, larguraPlotagem])
                .padding(0.1);
    let fnY = d3
                .scaleLinear()
                .domain([0, d3.max(parametros.dados.map(d=>d.valor))])
                .range([alturaPlotagem, 0]);

    let fnCores = d3
                    .scaleLinear()
                    .domain([0, d3.max(parametros.dados.map(d=>d.valor))])
                    .range(['#edf8e9', '#005a32']);

    plotagem
        .selectAll('.barra')
        .data(parametros.dados)
        .enter()
        .append('rect')
        .classed('barra', true)
        .attr('x', (d) => fnX(d.chave))
        .attr('y', (d) => fnY(d.valor))
        .attr('width', fnX.bandwidth())
        .attr('height', (d) => alturaPlotagem - fnY(d.valor))
        .attr('fill', (d) => fnCores(d.valor));

    plotagem
        .selectAll('.rotulo')
        .data(parametros.dados)
        .enter()
        .append('text')
        .classed('rotulo', true)
        .text((d)=>d.valor)
        .attr('x', (d)=> fnX(d.chave))
        .attr('dx', () => fnX.bandwidth()*0.5)
        .attr('y', (d) => fnY(d.valor))
        .attr('dy', -5);
}