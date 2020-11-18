<template>
<div class="box">
    <el-row :gutter="40">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content bg-purple" @click="sentFather(1)">
                <el-card shadow="hover">
                    <div class="card">
                        <div class="picture">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAACXBIWXMAABYlAAAWJQFJUiTwAAADg0lEQVR42u3cy00bURiG4Q8ra0MJ3nlpSy7AlOC9kTLpgA48dEAHTCSzpwRcAJJnyc50ENOAs+AoiogiZsbnft5Xyo4kBz+aGc/tvzidTqJ8G/ERAEwAE8AEMAFMABPAABPABDABTAATwAQwwJRl3/gIhvfyqitJc/NHkvaS9oupfsWyxgue6BgEO5FUS/r+nx/5KaleTHUAOD3cStK9pMsvfvQo6XYxVZMl8N2jKkmVpKXj32Enqdms3X+QBveh51/7ERLZOvDdoyaSniTNPP8uraTVZu1mtzgQNziyVWCDu++w+3LVUdLcNvKZuEGRbZ8mPQXElfm/nyLElaQH82+lCWyOuTOFb2bWEhNuMGSbW3CleKoixA2CbBN4GRHwMlJc78hcqvSP6xUZ4DC43pABDofrBRngsLjOkUfgBsd1ijwCNwpcZ8gjcKPLKvKoUNxVpLh/I68AHoY7kcLeo+1YY9YKcM9qhb0h0rVLs1aAe7Yqaa1FAb+8ap7I1vtnKzZrBrhjV6WtmStZmVca8KG0NRcFbJ5TfktoyW/nPltd4i66KWmtxQEvpqr18Yht7LVmrQAPqNLHI7axdpSlZ9yKBF5MtZd0HSnyUdK1WSPAmSFbxS3+PDgyZOu4xQNHhOwE1zbwLiK3XULIznBtA8d0ftkksiU7xZXsv124V/j3k9rNevgdGHP35lnu7zo5x3VxDF5FcCw76x6qpy3ZC651YPNe7lxhrhS1svRusGNkb7jWd9GfdteVEh/h4GB37RXXKXAuWUT2jst5sL/ddRBcgP0gB8MF2D1yUFyAhyF3PUtoJc1D4vIl67wvX5WkW/17YaeVdB96wh3AdrEnZgs/xLY2gDOPYzDAlHLOBoLf1O+VPF6q3NZjK19qcpuSa/0YfFO/TxRw2uy2Hh8GwgZdt6spuVaBDW7wabN9kXOdkuviGJzqtNnspuRaBzbH3CimzZq19DnmZjUl19UWXCmeqgLW7R041Wmz2UzJ5Ty4wAAGmAAmgAlgApgAJoABJoAJYAKYACaACWCACWACmAAmgAlgAphsA6c6bTbZKbm+gZuIPqimgHV3yvbbhVFMm93W417TZnOYkuvrGJzqtNnkp+R6ATbv5QadNjvkBfBcpuQ630V/2l1XYoTDl+tOboQDcR5MABPABDABDDABTAATwAQwAUwAA0wAE8AEMAFMZ/Ybhrp2girPRfkAAAAASUVORK5CYII=">
                        </div>
                        <div class="word">
                            <Span>ISSUE创建</Span>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content bg-purple-light" @click="sentFather(2)">
                <el-card shadow="hover">
                    <div class="card">
                        <div class="picture">
                            <img src="data:image/png;base64,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">
                        </div>
                        <div class="word">
                            <Span>ISSUE报表</Span>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content bg-purple" @click="sentFather(3)">
                <el-card shadow="hover">
                    <div class="card">
                        <div class="picture">
                            <img src="data:image/png;base64,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">
                        </div>
                        <div class="word">
                            <Span>账号管理</Span>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    name: 'Choose',
    data() {
        return {
            
        }
    },
    methods: {
        sentFather(index){
            this.$emit('son',index);

        }
    },
    
}
</script>

<style>
.box {
    margin: 50px auto;
    width: 80%;
}

.el-card__body {
    margin: 0 auto;
}

.word,
.picture {
    text-align: center;
    margin: 20px auto;
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>
